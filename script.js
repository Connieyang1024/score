// 增加新行功能
function addRow() {
    const table = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const rowCount = table.rows.length;

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
    `;
}

// 保存数据并生成链接
function saveData() {
    const rows = document.querySelectorAll("#scoreTable tbody tr");
    const data = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const rowData = Array.from(cells).slice(1).map(cell => cell.innerText);
        data.push(rowData);
    });

    const date = {
        year: document.getElementById('year').value,
        month: document.getElementById('month').value,
        day: document.getElementById('day').value
    };

    const payload = {
        date: date,
        tableData: data
    };

    const jsonData = JSON.stringify(payload);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = URL.createObjectURL(blob);

    document.getElementById('generatedLink').textContent = link;
    document.getElementById('linkContainer').classList.remove('hidden');
}

// 导出为图片
function exportToImage() {
    const table = document.getElementById('scoreTable');
    html2canvas(table).then(canvas => {
        const link = document.createElement('a');
        link.download = '打分表.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
