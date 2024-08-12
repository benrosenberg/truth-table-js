# truth-table-js
Port of truth table generator to JS, with additional features

Additional features:

 - [x] more operators
   - NOT, AND, OR, IMPLIES, EQUALS/XNOR, XOR, NOR, NAND
 - [x] choice of operator symbols
   - unicode, latex, custom
 - [x] more output formats
   - latex, markdown, csv, html
   - copying directly from html preview gives nicely formatted plaintext

To-do:

 - fix rpn display for non-commutative operators (e.g., implies)
   - example: P IMPLIES Q generates Q IMPLIES P in the header output which is not the same as what the table displays (the table is correct in displaying P IMPLIES Q)
 - more choices for true/false display
   - T/F, True/False, 1/0, ...
   - custom choices supported too
 - misc features
   - custom output column; select the output to generate a minimal expression
     - can generate in terms of specific gate subsets or minimized length
