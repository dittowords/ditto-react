module.exports = {
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