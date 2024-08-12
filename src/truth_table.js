// Error handling

function throw_error(error_message) {
    error_output = document.getElementById('error-output');
    error_output.innerText = error_message;
    error_output.style.display = 'initial';
    throw Error(error_message);
}

// Operator definitions

class Operator {
    constructor(name, precedence, arity, func, display_options_latex, display_options_plaintext) {
        /* Class for an operator B(x) or B(x,y)
        
        name : str
            name of this operator
        precedence : int
            global int value for this operator's precedence
        arity : int
            number of arguments this operator takes
        func : [bool, bool] -> bool
            function this operator performs
        display_options_latex : Array(str) -> str
            how this operator can be displayed in latex
        display_options_plaintext : Array(str) -> str
            how this operator can be displayed in plaintext

        Note: default display method is the operator name (e.g., "NOR"),
        which should come first in the display options list.
        */
       this.name = name;
       this.precedence = precedence;
       this.arity = arity;
       this.func = func;
       this.display_options_latex = display_options_latex;
       this.display_options_plaintext = display_options_plaintext;
    }
}

/* Operator precedence:

    1.  NOT
    2.  AND
    3.  OR
    4.  IMPLIES
    10. NAND
    11. XOR
    12. NOR
    20. EQUALS
*/

const OPERATORS = {
    'NOT' : new Operator('NOT', 1, 1, (x) => !x, [
        (x) => `NOT ${x}`,
        (x) => `\\text{NOT} ${x}`,
        (x) => `\\texttt{NOT} ${x}`,
        (x) => `\\neg ${x}`,
        (x) => `${x}'`,
        (x) => `!${x}`,
        (x) => `\\sim ${x}`,
        (x) => `\\bar ${x}`
    ], [
        (x) => `NOT ${x}`,
        (x) => `¬${x}`,
        (x) => `${x}'`,
        (x) => `!${x}`,
        (x) => `~${x}`
    ]),
    'AND' : new Operator('AND', 2, 2, (x,y) => x && y, [
        (x,y) => `${x} AND ${y}`,
        (x,y) => `${x} \\text{AND} ${y}`,
        (x,y) => `${x} \\texttt{AND} ${y}`,
        (x,y) => `${x} \\& ${y}`,
        (x,y) => `${x} \\&\\& ${y}`,
        (x,y) => `${x} \\texttt{\\&} ${y}`,
        (x,y) => `${x} \\texttt{\\&\\&} ${y}`,
        (x,y) => `${x} \\land ${y}`,
        (x,y) => `${x} \\cdot ${y}`,
        (x,y) => `${x} \\bullet ${y}`,
        (x,y) => `${x} \\times ${y}`,
        (x,y) => `${x} * ${y}`,
        (x,y) => `${x}${y}`,
        
    ], [
        (x,y) => `${x} AND ${y}`,
        (x,y) => `${x} & ${y}`,
        (x,y) => `${x} && ${y}`,
        (x,y) => `${x} ∧ ${y}`,
        (x,y) => `${x} · ${y}`,
        (x,y) => `${x} • ${y}`,
        (x,y) => `${x} ⨉ ${y}`,
        (x,y) => `${x} * ${y}`,
        (x,y) => `${x} ⁎ ${y}`,
        (x,y) => `${x}${y}`
    ]),
    'OR' : new Operator('OR', 3, 2, (x,y) => x || y, [
        (x,y) => `${x} OR ${y}`,
        (x,y) => `${x} \\text{OR} ${y}`,
        (x,y) => `${x} \\texttt{OR} ${y}`,
        (x,y) => `${x} \\mid ${y}`,
        (x,y) => `${x} \\mid\\mid ${y}`,
        (x,y) => `${x} | ${y}`,
        (x,y) => `${x} || ${y}`,
        (x,y) => `${x} \\texttt{|} ${y}`,
        (x,y) => `${x} \\texttt{||} ${y}`,
        (x,y) => `${x} \\lor ${y}`,
        (x,y) => `${x} + ${y}`
    ], [
        (x,y) => `${x} OR ${y}`,
        (x,y) => `${x} | ${y}`,
        (x,y) => `${x} || ${y}`,
        (x,y) => `${x} ∨ ${y}`,
        (x,y) => `${x} + ${y}`
    ]),
    'IMPLIES' : new Operator('IMPLIES', 4, 2, (x,y) => (!x) || y, [
        (x,y) => `${x} IMPLIES ${y}`,
        (x,y) => `${x} \\text{IMPLIES} ${y}`,
        (x,y) => `${x} \\texttt{IMPLIES} ${y}`,
        (x,y) => `${x} \\texttt{=>} ${y}`,
        (x,y) => `${x} \\texttt{->} ${y}`,
        (x,y) => `${x} \\implies ${y}`,
        (x,y) => `${x} \\Rightarrow ${y}`,
        (x,y) => `${x} \\to ${y}`,
        (x,y) => `${x} \\mapsto ${y}`,
        (x,y) => `${x} => ${y}`
    ], [
        (x,y) => `${x} IMPLIES ${y}`,
        (x,y) => `${x} ⇒ ${y}`,
        (x,y) => `${x} → ${y}`,
        (x,y) => `${x} ↦ ${y}`,
        (x,y) => `${x} -> ${y}`,
        (x,y) => `${x} => ${y}`
    ]),
    'EQUALS' : new Operator('EQUALS', 20, 2, (x,y) => x == y, [
        (x,y) => `${x} EQUALS ${y}`,
        (x,y) => `${x} \\text{EQUALS} ${y}`,
        (x,y) => `${x} \\texttt{EQUALS} ${y}`,
        (x,y) => `${x} XNOR ${y}`,
        (x,y) => `${x} \\text{XNOR} ${y}`,
        (x,y) => `${x} \\texttt{XNOR} ${y}`,
        (x,y) => `${x} = ${y}`,
        (x,y) => `${x} == ${y}`,
        (x,y) => `${x} \\equiv ${y}`,
        (x,y) => `${x} \\texttt{=} ${y}`,
        (x,y) => `${x} \\texttt{==} ${y}`,
        (x,y) => `${x} \\iff ${y}`,
        (x,y) => `${x} \\Leftrightarrow ${y}`,
        (x,y) => `${x} \\leftrightarrow ${y}`,
        (x,y) => `${x} \\odot ${y}`
    ], [
        (x,y) => `${x} EQUALS ${y}`,
        (x,y) => `${x} XNOR ${y}`,
        (x,y) => `${x} = ${y}`,
        (x,y) => `${x} == ${y}`,
        (x,y) => `${x} ⩵ ${y}`,
        (x,y) => `${x} ⩶ ${y}`,
        (x,y) => `${x} ≡ ${y}`,
        (x,y) => `${x} <=> ${y}`,
        (x,y) => `${x} <-> ${y}`,
        (x,y) => `${x} ⇔ ${y}`,
        (x,y) => `${x} ↔ ${y}`,
        (x,y) => `${x} ⊙ ${y}`
    ]),
    'XOR' : new Operator('XOR', 11, 2, (x,y) => (x != y) && (x || y), [
        (x,y) => `${x} XOR ${y}`,
        (x,y) => `${x} \\text{XOR} ${y}`,
        (x,y) => `${x} \\texttt{XOR} ${y}`,
        (x,y) => `${x} \\oplus ${y}`,
        (x,y) => `${x} \\veebar ${y}`,
        (x,y) => `${x} \\bar\\vee ${y}`,
        (x,y) => `${x} \\not\\equiv ${y}`
    ], [
        (x,y) => `${x} XOR ${y}`,
        (x,y) => `${x} ⊕ ${y}`,
        (x,y) => `${x} ⊻ ${y}`,
    ]),
    'NOR' : new Operator('NOR', 12, 2, (x,y) => !(x || y), [
        (x,y) => `${x} NOR ${y}`,
        (x,y) => `${x} \\text{NOR} ${y}`,
        (x,y) => `${x} \\texttt{NOR} ${y}`,
        (x,y) => `${x} \\downarrow ${y}`,
        (x,y) => `${x} \\shortdownarrow ${y}`,
        (x,y) => `${x} \\bar\\vee ${y}`
    ], [
        (x,y) => `${x} NOR ${y}`,
        (x,y) => `${x} ↓ ${y}`
    ]),
    'NAND' : new Operator('NAND', 10, 2, (x,y) => !(x && y), [
        (x,y) => `${x} NAND ${y}`,
        (x,y) => `${x} \\text{NAND} ${y}`,
        (x,y) => `${x} \\texttt{NAND} ${y}`,
        (x,y) => `${x} \\uparrow ${y}`,
        (x,y) => `${x} \\shortuparrow ${y}`,
        (x,y) => `${x} \\barwedge ${y}`,
        (x,y) => `${x} \\bar\\land ${y}`,
        (x,y) => `${x} \\mid ${y}`,
        (x,y) => `${x} | ${y}`,
        (x,y) => `${x} \\texttt{|} ${y}`
    ], [
        (x,y) => `${x} NAND ${y}`,
        (x,y) => `${x} ↑ ${y}`,
        (x,y) => `${x} ⊼ ${y}`
    ]),
}

function generate_operator_symbol_select() {
    root = document.getElementById('operator-symbol-select');
    html = '<table>';
    top_row = '<tr><th>Operator</th><th>LaTeX symbol</th><th>Plaintext symbol</th></tr>';
    html += top_row;
    keys = Object.keys(OPERATORS);
    keys.forEach(key => {
        op = OPERATORS[key];
        row = '<tr>';
        row += `<td>${op.name}</td>`;

        symbol_select_latex = `<select id="select-symbol-latex-${op.name}">`;
        op.display_options_latex.forEach((func, idx) => {
            symbol_select_latex += `<option value="${idx}">${func('x', 'y')}</option>`;
        });
        symbol_select_latex += '</select>';

        symbol_select_plaintext = `<select id="select-symbol-plaintext-${op.name}">`;
        op.display_options_plaintext.forEach((func, idx) => {
            symbol_select_plaintext += `<option value="${idx}">${func('x', 'y')}</option>`;
        });
        symbol_select_plaintext += '</select>';

        row += `<td>${symbol_select_latex}</td>`;
        row += `<td>${symbol_select_plaintext}</td>`;
        row += '</tr>';
        html += row;
    });
    html += '</table>';
    root.innerHTML = html;
}

function retrieve_display_choice(is_latex, operator_name) {
    if (is_latex) {
        selector = document.getElementById(`select-symbol-latex-${operator_name}`);
        index = selector.value;
        return OPERATORS[operator_name].display_options_latex[index];
    } else {
        selector = document.getElementById(`select-symbol-plaintext-${operator_name}`);
        index = selector.value;
        return OPERATORS[operator_name].display_options_plaintext[index];
    }
}

// Evaluate an expression

function has_greater_precedence(a, b) {
    if (b == '(') { return false; }
    if (!OPERATORS.hasOwnProperty(a)) {
        throw_error(`Unknown operator: ${a}`)
    }
    if (!OPERATORS.hasOwnProperty(b)) {
        throw_error(`Unknown operator: ${b}`)
    }
    return OPERATORS[a].precedence > OPERATORS[b].precedence;
}

function convert_to_rpn(expression, var_value_dictionary) {
    expression = expression.trim();
    token_list = expression.split(/\s+/).reverse();

    var VALID_TOKENS = Array.from(Object.keys(OPERATORS));
    VALID_TOKENS.push(...['(', ')']);
    VALID_TOKENS.push(...Object.keys(var_value_dictionary));

    var invalid_tokens = [];
    token_list.forEach(token => {
        if (!VALID_TOKENS.includes(token)) {
            invalid_tokens.push(token);
        }
    });
    if (invalid_tokens.length > 0) {
        throw_error(`Invalid token(s): ${invalid_tokens}`);
    }
    
    operation_stack = [];
    output_queue = [];

    while (token_list.length > 0) {
        t = token_list.pop();
        if (var_value_dictionary.hasOwnProperty(t)) {
            output_queue.push(t);
        }
        if (OPERATORS.hasOwnProperty(t)) {
            while ((operation_stack.length > 0) && 
                has_greater_precedence(t, operation_stack[operation_stack.length-1])) {
                output_queue.push(operation_stack.pop());
            }
            operation_stack.push(t);
        }
        if (t == '(') { operation_stack.push(t); };
        if (t == ')') {
            while (operation_stack.length > 0 && operation_stack[operation_stack.length-1] != '(') {
                output_queue.push(operation_stack.pop());
            }
            operation_stack.pop();
        };
    }
    operation_stack.reverse();
    output_queue.push(...operation_stack);

    return output_queue;
}

function evaluate_rpn(rpn_list, var_value_dictionary) {
    stack = [];
    queue = rpn_list;

    t = 0;
    while (t < queue.length) {
        if (var_value_dictionary.hasOwnProperty(queue[t])) {
            stack.push(queue[t]);
        } else if (OPERATORS.hasOwnProperty(queue[t]) && OPERATORS[queue[t]].arity == 2) {
            a = stack.pop();
            if (a !== false && a !== true) {
                if (!var_value_dictionary.hasOwnProperty(a)) {
                    throw_error(`Encountered unknown variable: ${a}`);
                }
                a = var_value_dictionary[a];
            }
            b = stack.pop();
            if (b !== false && b !== true) {
                if (!var_value_dictionary.hasOwnProperty(b)) {
                    throw_error(`Encountered unknown variable: ${b}`);
                }
                b = var_value_dictionary[b];
            }
            stack.push(OPERATORS[queue[t]].func(a, b));
        } else if (OPERATORS.hasOwnProperty(queue[t]) && OPERATORS[queue[t]].arity == 1) {
            a = stack.pop();
            if (a !== false && a !== true) {
                if (!var_value_dictionary.hasOwnProperty(a)) {
                    throw_error(`Encountered unknown variable: ${a}`);
                }
                a = var_value_dictionary[a];
            }
            stack.push(OPERATORS[queue[t]].func(a));
        }
        t += 1;
    }
    
    return stack[0];
}

function evaluate_expression(expression, var_value_dictionary) {
    rpn = convert_to_rpn(expression, var_value_dictionary);
    out = evaluate_rpn(rpn, var_value_dictionary);
    console.log(expression, var_value_dictionary, rpn, out);
    return out;
}

function generate_header_from_rpn(rpn_list, is_latex) {
    stack = [];
    queue = rpn_list;

    t = 0;
    while (t < queue.length) {
        if (OPERATORS.hasOwnProperty(queue[t]) && OPERATORS[queue[t]].arity == 2) {
            a = stack.pop();
            b = stack.pop();
            stack.push(retrieve_display_choice(is_latex, queue[t])(a, b));
        } else if (OPERATORS.hasOwnProperty(queue[t]) && OPERATORS[queue[t]].arity == 1) {
            a = stack.pop();
            stack.push(retrieve_display_choice(is_latex, queue[t])(a));
        } else {
            stack.push(queue[t]);
        }
        t += 1;
    }
    
    return stack[0];
}

function generate_header(expression, var_value_dictionary, is_latex) {
    rpn = convert_to_rpn(expression, var_value_dictionary);
    out = generate_header_from_rpn(rpn, is_latex);
    console.log(expression, var_value_dictionary, rpn, out);
    return out;
}

// Generate truth table

function check_varname_validity(variables) {
    var FORBIDDEN_VARNAMES = new Set(Object.keys(OPERATORS));
    FORBIDDEN_VARNAMES.add('(');
    FORBIDDEN_VARNAMES.add(')');
    var dupes = [];
    var illegal_varnames = [];
    var variable_set = new Set();
    variables.forEach(varname => {
        if (FORBIDDEN_VARNAMES.has(varname)) {
            illegal_varnames.push(varname);
        }
        if (variable_set.has(varname)) {
            dupes.push(varname);
        } else {
            variable_set.add(varname);
        }
    });
    if (dupes.length > 0) {
        throw_error(`Non-unique variable name(s) detected: ${dupes}`);
    }
    if (illegal_varnames.length > 0) {
        throw_error(`Forbidden variable name(s) detected: ${illegal_varnames}`);
    }
}

function pad_string(s, num_zeros) {
    return '0'.repeat(num_zeros - s.length) + s;
}

function generate_base_table(variables) {
    /* Generates base table with a column for each variable

    variables : Array(str)
        an array containing the name of each variable
        if this contains dupes, this function will throw

    Output: 2d array. First row is (sorted) variable names,
    second..last rows are values (true or false)
    */
    check_varname_validity(variables);
    variables.sort();
    table_length = 1 << variables.length;
    out = [variables];
    for (var i = 0; i < table_length; i++) {
        binrep = (i >>> 0).toString(2);
        binrep = pad_string(binrep, variables.length);
        out.push(binrep.split('').map((char) => char == '1' ? true : false));
    }
    return out;
}

function augment_table(base_table, expressions, is_latex) {
    // first, clone base table into cloned_table
    cloned_table = []
    base_table.forEach(row => {
        cloned_row = [...row];
        cloned_table.push(cloned_row);
    });

    variables = cloned_table[0];
    expression_headers = [];

    for (var i = 1; i < cloned_table.length; i++) {
        var_value_dictionary = {};
        cloned_table[i].forEach((element, j) => {
            var_value_dictionary[variables[j]] = element;
        });
        expressions.forEach(expression => {
            if (i == 1) {
                // only augment header list on first runthrough
                expression_headers.push(
                    generate_header(
                        expression,
                        var_value_dictionary,
                        is_latex
                    )
                );
            }
            result = evaluate_expression(expression, var_value_dictionary);
            cloned_table[i].push(result);
        });
    }
    cloned_table[0].push(...expression_headers);
    return cloned_table;
}

