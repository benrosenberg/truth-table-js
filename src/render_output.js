// Render table to specified output format

function render_latex() {}

function render_markdown() {}

function render_csv() {}

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

