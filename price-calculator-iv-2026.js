/*

Question 1 – Shopping Cart Price Calculator

Goal: Compute a pricing breakdown for a shopping cart using a small set of discount rules.
No rendering is required.
Description
You are given:
● A list of cart items, each with:
○ name (string)
○ price (number)
○ qty (number)
● A list of discount rules, each of which can be:
○ percent – a percentage off the subtotal (e.g., 10 means 10%)
○ threshold – a fixed discount applied only if the minimum amount (min_amount)
condition is met (e.g., min_amount = 1000, value = 50)

You need to calculate:
● subtotal = sum of price * qty for all valid items
● discounts = total discount applied (≥ 0)
● total = subtotal - discounts, never below 0
Suggestions
● Do not mutate input data.
● Invalid inputs (negative price or qty): either ignore the item or clamp to 0; clearly state
your choice.
● If multiple percent rules exist, apply only one — the most impactful (largest percent). ● If
multiple threshold rules exist, apply only one — the largest applicable discount where
subtotal ≥ min.
● Apply percent discount first (on subtotal), then threshold.
● Ensure consistent floating-point handling (e.g., round at the end if needed).
● Target complexity: O(n) over the number of items/rules.
● Write a few small test examples to validate correctness.
Acceptance Criteria
● Correct math for multiple items and mixed quantities.
● Deterministic and robust behavior for empty carts and no rules.
● Clean, minimal, well-structured code.

● Brief notes on how you handled invalid or edge cases.
Example Input
Cart:
● ("Phone", 800, 1)
● ("Case", 20, 2)
Rules:
● Percent: 10 (%)
● Threshold: min_amount = 1000, value = 50
Expected Behavior (illustrative):
● Subtotal = 840
● Apply 10% discount (84)
● Threshold not met
● Total ≈ 756
*/




function priceCalculator(cart, percentDiscounts, thresholdDiscounts){
  if(!cart || cart.length === 0) return [0,0,0];

  let subTotal = 0;
  let total = 0;
  let totalDiscountsApplied = 0;

  for (let i=0; i<cart.length; i++){
    const { price, qty } = cart[i];
    subTotal = subTotal + (price*qty);
  }
 

  // FIND PERCENT DISCOUNT TO APPLY FIRST
  let pdiscountToApply = Math.max(...percentDiscounts);

  total = subTotal - ((pdiscountToApply/100) * subTotal);
  totalDiscountsApplied += ((pdiscountToApply/100) * subTotal)

  // FIND THRESHOLD DISCOUNT TO APPLY

let maxTDiscount = 0;
 for (let i=0; i<thresholdDiscounts.length; i++){
   
    const { minAmount, value } = thresholdDiscounts[i];
    // FULFIL THE CRITERIA OR NOT

    if (total >=minAmount && value > maxTDiscount){
      maxTDiscount = value;
    }
  }

console.log("maxThresholdDscount", maxTDiscount);
  totalDiscountsApplied += maxTDiscount;

  // FIND TOTAL AFTER Threshold discount
  total = total - maxTDiscount;


  return [subTotal, totalDiscountsApplied, Math.round(total,1)];

}



// INPUT and CALL FUNCTION
let cart = [{name: "Shoes", price: 100, qty: 12},
            {name: "Bag",   price: 50, qty: 5},
            {name: "Laptop", price: 200, qty: 20},
            {name: "Pen", price: 300, qty: 2},
            // {name: "Mobile", price: -1, qty: -2}
            ]
let percentDiscounts = [4,2,11,9];
let thresholdDiscounts = [{minAmount: 1000, value: 50}, {minAmount: 500, value: 30}];


const [subTotal, discount, total] = priceCalculator(cart, percentDiscounts, thresholdDiscounts);

console.log(subTotal, discount, total);



