import { shallowRef } from "vue";
import exampleChart from "../components/exampleChart.vue";
import examplePage from "../components/examplePage.vue";
export default class ExamplePage {
  title = "Example Page";
  key = "examplePage";
  pageComponent = examplePage;
  pageProps = {};
  loadData = async () => {
    return {
      exampleChart: [
        { key: "value1", key2: "value1" },
        { key: "value2", key2: "value2" },
        { key: "Value3", key2: "value3" },
        { key: "value4", key2: "value4" },
      ],
    };
  };

  filters = function () {
    return {
      exampleSelect: {
        label: "Example Select",
        component: "harnessVueBootstrapSelect",
        valueType: "string",
        options: [
          {
            key: "exampleOption",
            label: "Example Option",
            default: true,
          },
          {
            key: "exampleOption2",
            label: "Example Option 2",
          },
          {
            key: "exampleOption3",
            label: "Example Option 3",
          },
        ],
        props: {
          allowValidation: true,
          validFeedback: "foo",
        },
      },
      exampleMultiSelect: {
        label: "Example Multiselect",
        component: "harnessVueBootstrapSelect",
        valueValidator: (harness, value) => value.length > 1,
        props: {
          multiple: true,
          allowValidation: true,
          showValid: true,
          validFeedback: "foo",
          invalidFeedback: "Choose more than 1",
        },
        options: [
          {
            key: "exampleOption",
            label: "Example Option",
          },
          {
            key: "exampleOption2",
            label: "Example Option 2",
            default: true,
          },
          {
            key: "exampleOption3",
            label: "Example Option 3",
            default: true,
          },
        ],
      },
      exampleInput: {
        label: "Example Input",
        component: "HarnessVueBootstrapInput",
        options: [],
        valueType: "number",
        props: {
          type: "number",
          prependHTML: "$",
          appendHTML: ".00",
          min: 0,
          max: 10,
          step: 1,
          required: true,
        },
      },
      exampleInputFloat: {
        label: "Example Input",
        component: "HarnessVueBootstrapInput",
        valueType: "number",
        options: [],
        props: {
          labelPosition: "floating",
          required: true,
        },
      },
      exampleInputDatalist: {
        label: "Example Input",
        component: "HarnessVueBootstrapInput",
        options: [
          { key: "", label: "" },
          { key: "foo", label: "foo" },
          { key: "bar", label: "bar" },
        ],
        props: { datalist: true },
      },
      exampleCheckboxGroup: {
        label: "Example Checkbox Group",
        component: "HarnessVueBootstrapCheckboxGroup",
        options: [
          {
            key: "exampleOption",
            label: "Example Option",
          },
          {
            key: "exampleOption2",
            label: "Example Option2",
          },
          {
            key: "exampleOption3",
            label: "Example Option2",
          },
          {
            key: "exampleOption4",
            label: "Example Option2",
          },
        ],
        valueValidator: (harness, value) => value.length > 1,
        props: {
          multiple: true,
          allowValidation: true,
          // showValid: true,
          // showInvalid: false,
          invalidFeedback: "woo",
          validFeedback: "wow",
        },
      },
      exampleRadioGroup: {
        label: "Example Radio Group",
        component: "HarnessVueBootstrapCheckboxGroup",
        options: [
          {
            key: "exampleOption",
            label: "Example Option",
          },
          {
            key: "exampleOption2",
            label: "Example Option2",
          },
        ],
        props: {
          type: "radio",
        },
      },
      exampleSwitchGroup: {
        label: "Example Switch Group",
        component: "HarnessVueBootstrapCheckboxGroup",
        options: [
          {
            key: "exampleOption",
            label: "Example Option",
          },
          {
            key: "exampleOption2",
            label: "Example Option2",
          },
        ],
        props: {
          type: "switch",
          multiple: true,
        },
      },
    };
  };

  charts = function () {
    return {
      exampleChart: {
        title: "Example Chart",
        component: "ChartWithTable",
        props: {
          chartComponent: shallowRef(exampleChart),
          tableAdapter: function (chart, filters, data) {
            const map = {
              key: "Transformed key",
              key2: "Transformed key 2",
            };
            const newData = [];
            data.forEach((datum) => {
              newData.push(
                Object.keys(datum).reduce((acc, key) => {
                  acc[map[key]] =
                    datum[key].toUpperCase() + " TRANSFORMED UPPERCASE";
                  return acc;
                }, {}),
              );
            });
            return newData;
          },
        },
      },
    };
  };
}
