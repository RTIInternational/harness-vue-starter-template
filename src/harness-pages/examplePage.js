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
        key: "exampleSelect",
        label: "Example Select",
        component: "harnessVueBootstrapSelect",
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
      },
      exampleMultiSelect: {
        key: "exampleMultiSelect",
        label: "Example Multiselect",
        component: "harnessVueBootstrapSelect",
        props: {
          multiple: true,
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
        key: "exampleInput",
        label: "Example Input",
        component: "HarnessVueBootstrapInput",
        options: [
          {
            key: "value",
          },
        ],
      },
      exampleRadioGroup: {
        key: "exampleRadioGroup",
        label: "Example Radio Group",
        component: "HarnessVueBootstrapRadioGroup",
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
      },
      exampleCheckboxGroup: {
        key: "exampleCheckboxGroup",
        label: "Example Checkbox Group",
        component: "HarnessVueBootstrapCheckboxGroup",
        options: [
          {
            key: "exampleOption",
            label: "Example Option",
            default: true,
          },
          {
            key: "exampleOption2",
            label: "Example Option2",
          },
          {
            key: "exampleOption3",
            label: "Example Option3",
          },
          {
            key: "exampleOption4",
            label: "Example Option4",
          },
        ],
        props: {
          multiple: true,
          labelPosition: "vertical",
          collapse: true,
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
                }, {})
              );
            });
            return newData;
          },
        },
      },
    };
  };
}
