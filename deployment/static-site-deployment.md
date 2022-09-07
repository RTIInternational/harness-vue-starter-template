# Deploying a static website to AWS infrastructure

NOTE: At RTI, we use the `project-number` tag to keep track of our project costs. For non-RTI use, you can ignore this repeated step in this workflow.

## Initial Setup

### AWS S3 (Storage)

AWS S3 (simple storage service) is amazon's file hosting and storage service. S3 has an option for hosting a static website, in which it serves the contents of your bucket over the web, choosing a specific file to act as the entrypoint/root of your site. 

1. Create your bucket
	* Make sure name is unique
	* Ensure "block all public access" is selected
2. Navigate to bucket, select "properties"
	* Tags: Add key `project-number` and value charge code
	* Static Website Hosting
		* Enable "use this bucket to host a website"
		* For Vue applications, set index to `index.html`
		* For other applications, specify which file you want to be the entrypoint for your site
3. Upload your application's files to the bucket
	* It's highly encouraged to use the aws-cli here, either manually or through gitlab CI. Ask around for examples!

At this point, your app is being served at `http://<bucket-name>.s3-website-<region>.amazonaws.com`, but public access is blocked. In our next step, we will create a cloudfront distribution and ensure it is the only way to access this bucket.

### Cloudfront

Cloudfront is AWS's global CDN, or content delivery network. This service will allow us to publish the contents of our S3 bucket to the web, and add features like SSL for HTTPS, authentication through AWS Lambda, and a named URL with DNS through Route 53.

Open Cloudfront in another tab/window, as we'll be returning to S3 at the end of this step to grant access to the bucket from our Cloudfront distribution. All options can be set to default as we walk through this setup, other than options explicitly listed below.

1. Create Distribution
	* Web
		* Origin Domain Name: choose your amazon S3 bucket from the dropdown
	* Restrict Bucket Access - Yes
		* Create a new identity
		* comment will be the name of the identity, name it the same as your bucket
		* For "Grant Read Permissions on Bucket" , select "Yes, Update Bucket Policy"
	* Viewer Protocol Policy - Redirect HTTP to HTTPS
2. Add tags
	* Navigate to your newly created Distribution
	* Under the "tags" tab, add your project-number and charge code
3. Add error pages (optional, for apps using vue router)
	* Choose Error Pages tab
	* Create custom Error Response
	* Create one for 403, one for 404
	* For both, choose Customize Error Response, and set the response page path to `/index.html` and the response code to `200` 

By selecting the "Yes, Update Bucket Policy", we re-wrote the bucket policy to allow access to this cloudfront distribution, but haven't granted anything else access. That should mean the following behavior is true:

* Accessing the site and contents by the cloudfront URL `https://<distribution-id>.cloudfront.net/` is successful
* Accessing the site and contents by the S3 URL `http://<bucket-name>.s3-website-<region>.amazonaws.com` returns `403 Unauthorized`


## Optional Enhancements

### Add Authentication through AWS Lambda
Using AWS Lambda, we can create a function that adds basic HTTP Authentication to your distribution. This ensures that a password is required to access the contents of your site. This authentication is very basic, and lacks standard features like the ability to log out - we would like to enhance this by using a service like AWS Amplify or Auth0 in the future.

1. Create auth function on Lambda
	* On AWS Lambda, go to functions
	* Create function
	* Author from scratch
	* Runtime = Node.js 10.x
	* Permissions - choose 'use an existing role' and search for `service-role/cloudfront-lambda-auth-role`
2. Copy code and change variables
	* Copy the contents of `lambda-auth.js` into the `index.js` window
	* change the username and password on lines 41 and 42 to your desired username/password
	* Under `tags`, add your `project-number` and charge code
	* At the top of the screen, save your function then publish your function
	* At the top right, copy the ARN, which should now end with `:1` as you've published version 1
3. Add authentication to your cloudfront distribution
	* Return to your cloudfront distribution
	* Go to the behaviors tab and edit your behavior
	* Under `Lambda Function Associations`, add your copied ARN to `Viewer Request`

Your cloudfront distribution should now have the associated username/password. Note that you may need to wait for it to apply (see the 'status' column on the distributions page). If you haven't copied your app contents to S3 yet, you can freely do so now, as all of the following should be true:

* Contents are accessible via the cloudfront url with username/password
* Contents are not accessible via the s3 url

### Purchase and use a domain name
Using Amazon Route53, we can purchase a domain name and use it with SSL for our static sites. Please note that the DNS purchase and certificate generation may take some time to process on Amazon's end.

1. Purchase Domain Name
    * Navigate to AWS Route 53
    * Type your domain name into the checker, and follow the instructions to purchase the domain
2. Generate ACM Certificate for SSL
    * Navigate to AWS Certificate Manager
    * Click "Request a certificate" and follow instructions to generate a certificate
    * Use the DNS method to verify
3. Point domain name to Cloudfront distribution
    * Navigate back to Route 53
    * Click "hosted zones" and select the domain name you purchased
    * Create Record Set with the name of your choosing, such as `www` or whatever subdomain you choose
    * Type is CNAME, Value is the URL of your cloudfront distribution - for example XXXXXXXXXXXX.cloudfront.net
4. Register information on cloudfront
    * Navigate back to your cloudfront distribution
    * Edit general
    * Add new URL to Alternate Domain Names
    * Change SSL Certificate from default to Custom, and type in the name you chose - it will auto-populate
5. Wait!
    * It may take 15min to an hour for these changes to reflect across DNS servers and Cloudfront distributions
