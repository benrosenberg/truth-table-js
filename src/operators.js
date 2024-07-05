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
    'NOR' : new Operator('NOR', 12, 2, (x,y) => (x != y) && (x || y), [
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
    'NAND' : new Operator('NAND', 10, 2, (x,y) => (x != y) && (x || y), [
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