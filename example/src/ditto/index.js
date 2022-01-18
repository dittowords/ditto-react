module.exports = {
  "project_61e72388365c930170607378": {
    "base": {
      "frame_61e7238bbae5dc00fb66ddf5": {
        "frameName": "Plurals",
        "blocks": {},
        "otherText": {
          "text_61e7238bbae5dc00fb66de01": {
            "text": "You ordered {{itemCount}} apples",
            "variables": {
              "itemCount": {
                "example": 10
              }
            },
            "plurals": {
              "other": "You ordered {{itemCount}} apples",
              "one": "You ordered {{itemCount}} apple"
            }
          },
          "text_61e7238bbae5dc00fb66de0b": {
            "text": "There are  {{itemCount}} items in the cart",
            "is_comp": true,
            "component_api_id": "shopping-cart",
            "variables": {
              "itemCount": {
                "example": 10
              }
            },
            "plurals": {
              "other": "There are  {{itemCount}} items in the cart",
              "one": "There is  {{itemCount}} item in the cart",
              "zero": "The cart is empty"
            }
          },
          "text_61e7238bbae5dc00fb66de15": {
            "text": "There are {{itemCount}} puppies",
            "variables": {
              "itemCount": {
                "example": 10
              }
            },
            "plurals": {
              "other": "There are {{itemCount}} puppies",
              "one": "There is {{itemCount}} puppy"
            }
          }
        }
      },
      "frame_61e7238bbae5dc00fb66ddf1": {
        "frameName": "Welcome",
        "blocks": {
          "header": {
            "text_61e7238bbae5dc00fb66ddff": {
              "text": "Welcome!",
              "variants": {
                "french": "Bonjour!"
              }
            },
            "text_61e7238bbae5dc00fb66de09": {
              "text": "Setting up your account should take less than {{minutes}} minutes.",
              "variables": {
                "minutes": {
                  "example": 10
                }
              },
              "plurals": {
                "other": "Setting up your account should take less than {{minutes}} minutes.",
                "one": "Setting up your account should take less than {{minutes}} minute."
              }
            }
          },
          "cta": {
            "text_61e7238bbae5dc00fb66de13": {
              "text": "Please enter your email address."
            },
            "text_61e7238bbae5dc00fb66de1c": {
              "text": "{{email}}",
              "variables": {
                "email": {
                  "example": "email@address.com",
                  "fallback": "email@address.com"
                }
              }
            },
            "text_61e7238bbae5dc00fb66de24": {
              "text": "This will be the email address you use to access your account."
            }
          }
        },
        "otherText": {
          "text_61e7238bbae5dc00fb66de2c": {
            "text": "Next",
            "variants": {
              "french": "Prochaine"
            }
          }
        }
      },
      "frame_61e7238bbae5dc00fb66ddf2": {
        "frameName": "Pricing",
        "blocks": {
          "header": {
            "text_61e7238bbae5dc00fb66ddfb": {
              "text": "Step {{stepNumber}} of {{totalSteps}}",
              "variables": {
                "stepNumber": {
                  "example": 2
                },
                "totalSteps": {
                  "example": 4
                }
              }
            },
            "text_61e7238bbae5dc00fb66de05": {
              "text": "Pick your pricing plan."
            },
            "text_61e7238bbae5dc00fb66de0f": {
              "text": "If you have any questions regarding pricing, please visit our {{pricingPageLink}}. ",
              "variables": {
                "pricingPageLink": {
                  "text": "detailed pricing page",
                  "url": "https://dittwords.com/pricing"
                }
              }
            }
          },
          "plan_1": {
            "text_61e7238bbae5dc00fb66de18": {
              "text": "{{planName}}",
              "variables": {
                "planName": {
                  "example": "Basic"
                }
              }
            },
            "text_61e7238bbae5dc00fb66de20": {
              "text": "Our {{planName}} Plan provides integrations with Slack and WhatsApp.",
              "variables": {
                "planName": {
                  "example": "Basic"
                }
              }
            },
            "text_61e7238bbae5dc00fb66de28": {
              "text": "$48"
            }
          },
          "plan_2": {
            "text_61e7238bbae5dc00fb66de2f": {
              "text": "{{planName}}",
              "variables": {
                "planName": {
                  "example": "Basic"
                }
              }
            },
            "text_61e7238bbae5dc00fb66de34": {
              "text": "Our Team Plan includes everything in the Basic Plan, in addition to unlimited messages between members of your workspace.",
              "is_comp": true,
              "component_api_id": "team-plan"
            },
            "text_61e7238bbae5dc00fb66de38": {
              "text": "$98"
            }
          }
        },
        "otherText": {
          "text_61e7238bbae5dc00fb66de3b": {
            "text": "Next"
          },
          "text_61e7238bbae5dc00fb66de3d": {
            "text": "<- Back"
          }
        }
      },
      "frame_61e7238bbae5dc00fb66ddf3": {
        "frameName": "Invite",
        "blocks": {
          "header": {
            "text_61e7238bbae5dc00fb66ddfd": {
              "text": "Step {{stepNumber}} of {{totalSteps}}",
              "variables": {
                "stepNumber": {
                  "example": 2
                },
                "totalSteps": {
                  "example": 4
                }
              }
            },
            "text_61e7238bbae5dc00fb66de07": {
              "text": "Invite your teammates.",
              "plurals": {
                "two": "Invite your teammates.",
                "few": "Invite your teammates.",
                "many": "Invite your teammates.",
                "other": "Invite your teammates.",
                "one": "Invite your teammate.",
                "zero": "Invite your teammates."
              }
            },
            "text_61e7238bbae5dc00fb66de11": {
              "text": "They’ll receive an email with more instructions to join you here."
            }
          },
          "email_inputs": {
            "text_61e7238bbae5dc00fb66de1a": {
              "text": "email@address.com"
            },
            "text_61e7238bbae5dc00fb66de22": {
              "text": "email@address.com"
            },
            "text_61e7238bbae5dc00fb66de2a": {
              "text": "email@address.com"
            }
          }
        },
        "otherText": {
          "text_61e7238bbae5dc00fb66de31": {
            "text": "Skip"
          },
          "text_61e7238bbae5dc00fb66de36": {
            "text": "Next"
          },
          "text_61e7238bbae5dc00fb66de3a": {
            "text": "<- Back"
          }
        }
      }
    }
  },
  "ditto_component_library": {
    "base": {
      "shopping-cart": {
        "name": "Shopping Cart",
        "text": "There are  {{itemCount}} items in the cart",
        "variables": {
          "itemCount": {
            "example": 10
          }
        },
        "plurals": {
          "other": "There are  {{itemCount}} items in the cart",
          "one": "There is  {{itemCount}} item in the cart",
          "zero": "The cart is empty"
        }
      },
      "team-plan": {
        "name": "Team Plan",
        "text": "Our Team Plan includes everything in the Basic Plan, in addition to unlimited messages between members of your workspace."
      }
    }
  }
}