module.exports = {
  "project_61df719ebc783c37d722f2c1": {
    "base": {
      "frame_61df7721bc783c37d722fbce": {
        "frameName": "Plurals",
        "blocks": {},
        "otherText": {
          "text_61df7721bc783c37d722fbd2": {
            "text": "You ordered {{count}} apples",
            "variables": {
              "count": {
                "example": 1
              }
            },
            "plurals": {
              "many": "You ordered {{count}} apples",
              "one": "You ordered 1 apple"
            }
          },
          "text_61df7721bc783c37d722fbd4": {
            "text": "There are  {{count}} items in the cart",
            "is_comp": true,
            "component_api_id": "shoppingcart",
            "variables": {
              "count": {
                "example": 1
              }
            },
            "plurals": {
              "other": "There are  {{count}} items in the cart",
              "zero": "The cart is empty",
              "one": "There is  {{count}} item in the cart"
            }
          },
          "text_61df7721bc783c37d722fbd6": {
            "text": "There are {{count}} puppies",
            "variables": {
              "count": {
                "example": 1
              }
            },
            "plurals": {
              "many": "There are {{count}} puppies",
              "one": "There is {{count}} puppy"
            }
          }
        }
      },
      "frame_61df720abc783c37d722f3a0": {
        "frameName": "Welcome",
        "blocks": {
          "header": {
            "text_61df720abc783c37d722f3ae": {
              "text": "Welcome!",
              "variants": {
                "french-1": "Bonjour!"
              }
            },
            "text_61df720abc783c37d722f3b4": {
              "text": "Setting up your account should take less than {{Minutes}} minutes.",
              "variables": {
                "Minutes": {
                  "example": 12
                }
              },
              "plurals": {
                "many": "Setting up your account should take less than {{Minutes}} minutes.",
                "one": "Setting up your account should take less than {{Minutes}} minute."
              }
            }
          },
          "cta": {
            "text_61df720abc783c37d722f3ba": {
              "text": "Please enter your email address."
            },
            "text_61df720abc783c37d722f3c0": {
              "text": "{{Email}}",
              "variables": {
                "Email": {
                  "example": "email@example.com",
                  "fallback": "email@address.com"
                }
              }
            },
            "text_61df720abc783c37d722f3c6": {
              "text": "This will be the email address you use to access your account."
            }
          }
        },
        "otherText": {
          "text_61df720abc783c37d722f3cc": {
            "text": "Next",
            "variants": {
              "french-1": "Prochaine"
            }
          }
        }
      },
      "frame_61df720abc783c37d722f3a2": {
        "frameName": "Pricing",
        "blocks": {
          "header": {
            "text_61df720abc783c37d722f3b0": {
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
            "text_61df720abc783c37d722f3b6": {
              "text": "Pick your pricing plan."
            },
            "text_61df720abc783c37d722f3bc": {
              "text": "If you have any questions regarding pricing, please visit our {{pricingPageLink}}",
              "variables": {
                "pricingPageLink": {
                  "text": "detailed pricing page. ",
                  "url": "https://test.com/pricing"
                }
              }
            }
          },
          "basic_plan": {
            "text_61df720abc783c37d722f3c2": {
              "text": "{{PlanName}}",
              "variables": {
                "PlanName": {
                  "example": "Basic"
                }
              }
            },
            "text_61df720abc783c37d722f3c8": {
              "text": "Our {{PlanName}} Plan provides integrations with Slack and WhatsApp.",
              "variables": {
                "PlanName": {
                  "example": "Basic"
                }
              }
            },
            "text_61df720abc783c37d722f3cf": {
              "text": "$48"
            }
          },
          "team_plan": {
            "text_61df720abc783c37d722f3d3": {
              "text": "Team"
            },
            "text_61df720abc783c37d722f3d6": {
              "text": "Our Team Plan includes everything in the Basic Plan, in addition to unlimited messages between members of your workspace.",
              "is_comp": true,
              "component_api_id": "teamplan"
            },
            "text_61df720abc783c37d722f3d8": {
              "text": "$98"
            }
          }
        },
        "otherText": {
          "text_61df720abc783c37d722f3da": {
            "text": "Next"
          },
          "text_61df720abc783c37d722f3dc": {
            "text": "<- Back"
          }
        }
      },
      "frame_61df720abc783c37d722f3a4": {
        "frameName": "Invite",
        "blocks": {
          "header": {
            "text_61df720abc783c37d722f3ac": {
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
            "text_61df720abc783c37d722f3b2": {
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
            "text_61df720abc783c37d722f3b8": {
              "text": "They’ll receive an email with more instructions to join you here."
            }
          },
          "email_inputs": {
            "text_61df720abc783c37d722f3be": {
              "text": "{{Email}}",
              "variables": {
                "Email": {
                  "example": "email@example.com",
                  "fallback": "email@address.com"
                }
              }
            },
            "text_61df720abc783c37d722f3ca": {
              "text": "{{Email}}",
              "variables": {
                "Email": {
                  "example": "email@example.com",
                  "fallback": "email@address.com"
                }
              }
            },
            "text_61df720abc783c37d722f3c4": {
              "text": "{{Email}}",
              "variables": {
                "Email": {
                  "example": "email@example.com",
                  "fallback": "email@address.com"
                }
              }
            }
          }
        },
        "otherText": {
          "text_61df720abc783c37d722f3cd": {
            "text": "Skip"
          },
          "text_61df720abc783c37d722f3d1": {
            "text": "Next"
          },
          "text_61df720abc783c37d722f3d5": {
            "text": "<- Back"
          }
        }
      },
      "frame_61df7203bc783c37d722f348": {
        "frameName": "Confirm",
        "blocks": {},
        "otherText": {
          "text_61df7203bc783c37d722f34c": {
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
          "text_61df7203bc783c37d722f34e": {
            "text": "You’re almost done!"
          },
          "text_61df7203bc783c37d722f350": {
            "text": "Check your email for a confirmation and invoice. "
          },
          "text_61df7203bc783c37d722f352": {
            "text": "Your invoice will be billed monthly, and new members will be prorated."
          },
          "text_61df7203bc783c37d722f354": {
            "text": "Thank you for signing up!"
          },
          "text_61df7203bc783c37d722f356": {
            "text": "Finish"
          },
          "text_61df7203bc783c37d722f358": {
            "text": "<- Back"
          }
        }
      }
    }
  },
  "ditto_component_library": {
    "base": {
      "shoppingcart": {
        "name": "ShoppingCart",
        "text": "There are  {{count}} items in the cart",
        "variables": {
          "count": {
            "example": 1
          }
        },
        "plurals": {
          "other": "There are  {{count}} items in the cart",
          "zero": "The cart is empty",
          "one": "There is  {{count}} item in the cart"
        }
      },
      "teamplan": {
        "name": "TeamPlan",
        "text": "Our Team Plan includes everything in the Basic Plan, in addition to unlimited messages between members of your workspace."
      }
    }
  }
}