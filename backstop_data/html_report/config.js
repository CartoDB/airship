report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Tabs_0_document_0_phone.png",
        "test": "../bitmaps_test/20180805-153620/backstop_default_Tabs_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_Tabs_0_document_0_phone.png",
        "label": "Tabs",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "/packages/styles/src/core/layout/toolbar/test/tabs.html",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.35",
          "analysisTime": 25
        },
        "diffImage": "../bitmaps_test/20180805-153620/failed_diff_backstop_default_Tabs_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Tabs_0_document_1_tablet.png",
        "test": "../bitmaps_test/20180805-153620/backstop_default_Tabs_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Tabs_0_document_1_tablet.png",
        "label": "Tabs",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "/packages/styles/src/core/layout/toolbar/test/tabs.html",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_With_actions_0_document_0_phone.png",
        "test": "../bitmaps_test/20180805-153620/backstop_default_With_actions_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_With_actions_0_document_0_phone.png",
        "label": "With actions",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "/packages/styles/src/core/layout/toolbar/test/with-actions.html",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_With_actions_0_document_1_tablet.png",
        "test": "../bitmaps_test/20180805-153620/backstop_default_With_actions_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_With_actions_0_document_1_tablet.png",
        "label": "With actions",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "/packages/styles/src/core/layout/toolbar/test/with-actions.html",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    }
  ],
  "id": "backstop_default"
});