// Render table to specified output format

function process_value_latex(value) {
    if (value) {
        return '\\text{True}';
    } else {
        return '\\text{False}';
    }
}

function render_latex(table) {
    /* Render a table in LaTeX

    table : Array(Array(str|bool))
        truth table. first row is column headers,
        remaining rows are booleans
    */
    num_cols = table[0].length;
    out = `\\begin{array}{${'c|'.repeat(num_cols-1)}c}\\hline \n`;
    header = '';
    table[0].forEach(column_header => {
        header += `${column_header} & `;
    });
    header = header.substring(0, header.length - 2) + '\\\\ \n';
    out += header;
    for (var i = 1; i < table.length; i++) {
        row = '';
        table[i].forEach(value => {
            row += `${process_value_latex(value)} & `;
        });
        row = row.substring(0, row.length - 2) + '\\\\ \n';
        out += row;
    }
    out += '\\end{array}';
    return out;
}

function render_markdown() {
    /* Render a table in Markdown format

    table : Array(Array(str|bool))
        truth table. first row is column headers,
        remaining rows are booleans
    */
    out = '';
    header = '| ' + table[0].join(' | ') + ' |\n';
    header += '|-'.repeat(table[0].length) + '|\n';
    out += header;
    for (var i = 1; i < table.length; i++) {
        row = '| ' + table[i].join(' | ') + ' |\n';
        out += row;
    }
    return out;
}

function render_csv() {
    /* Render a table in CSV format

    table : Array(Array(str|bool))
        truth table. first row is column headers,
        remaining rows are booleans
    */
    out = '';
    header = table[0].join(',') + ',\n';
    out += header;
    for (var i = 1; i < table.length; i++) {
        row = table[i].join(',') + ',\n';
        out += row;
    }
    return out;
}

function render_html(table) {
    /* Render a table in HTML

    table : Array(Array(str|bool))
        truth table. first row is column headers,
        remaining rows are booleans
    */
    out = '<table>';
    header = '<tr>';
    table[0].forEach(column_header => {
        header += `<th>${column_header}</th>`;
    });
    header += '</tr>';
    out += header;
    for (var i = 1; i < table.length; i++) {
        row = '<tr>';
        table[i].forEach(value => {
            row += `<td>${value}</td>`;
        });
        row += '</tr>';
        out += row;
    }
    out += '</table>';
    return out;
}

