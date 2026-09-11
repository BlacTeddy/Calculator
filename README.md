# Calculator
Classic project to learn how the language works
# Learning TypeScript
## TypeScript Calculator
A DOM-based calculator built while learning TypeScript, featuring immutable input handling and support for continuous multi-operator equations.

## Features
- Readonly Input Protection: Enforces strict immutability on the input display to prevent unauthorized or manual overriding via developer tools or unexpected DOM manipulation.

- Dynamic Equation Evaluation: Handles equations of any length supporting basic arithmetic operations (`+`, `−`, `×`, `÷`) processed in standard order of operations.

- Button Press Event Handling: Captures continuous user inputs cleanly and appends them to the current calculation state.

- Strictly Typed: Built from the ground up using TypeScript interfaces, type guards, and readonly modifiers to practice type safety.
---
### What I Learned
* Leveraging TypeScript `readonly` modifiers and immutable state patterns to protect UI components.

* Managing DOM event listeners for continuous button-press states.

* Writing custom function(s) to safely evaluate mathematical strings of dynamic lengths.

#### `MutationObserver` (DOM Attribute Watcher):
+ Runtime DOM level.

+ What it does: This actively listens for changes made directly to the HTML element's attributes in the DOM tree. If a user tries to bypass your app by using DevTools to delete the `readonly` attribute, the observer instantly catches the mutation and forces it back on (`display.setAttribute`(`'readonly', 'true'`)).

+ The Limitation: It only watches for DOM attribute changes; it doesn't stop another script from changing the JavaScript property directly

---

### Future Improvements & Lessons Learned

#### **Replacing `eval()` with a Custom Parser:** 
I used `eval()` to quickly get the calculator logic working while focusing on TypeScript types and DOM state. However, I recognize that `eval()` is a major security risk and bad practice for processing user input. My next iteration will replace it with a custom tokenization function (`parseEquation`) to evaluate equations safely.

`eval()`

- **Execution**: Takes any string and runs it as executable JavaScript code. If you pass `"2 + 2"`, it returns `4`. If you pass a malicious script, it executes that script.

- **Security**: *Critical vulnerability*. If a user finds a way to inject arbitrary text into your calculator, `eval()` will run whatever they type. For this reason, `eval()` is widely considered a severe anti-pattern in web development.

- **Ease of Use**: Instant. JavaScript handles all math parsing, operator precedence, and calculation rules natively.

`parseEquation()`

- **Execution**: Treats the input string as a series of tokens (numbers and operators) and evaluates them step-by-step using your own logic.

- **Security**: Safe. Because the function only matches expected characters (like digits and `+`, `-`, `*`, `/`), it cannot execute arbitrary code. If a user injects text or unexpected symbols, your parser will simply fail to match them or throw a controlled error.

- **Implementation Effort**: Requires writing logic for tokenization, splitting strings, and managing the order of operations yourself.

---
#### Moving Away from Global State:
- The current implementation relies on global variables and functions with side effects (mutating state directly rather than returning values). In the next iteration, refactor the logic into a dedicated class or module pattern, use pure functions and explicit returns, making the codebase much easier to test and maintain.
