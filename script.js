// 增加新行
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
function saveAndGenerateLink() {
    const rows = document.querySelectorAll("#scoreTable tbody tr");
    const tableData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const rowData = Array.from(cells).slice(1).map(cell => cell.innerText);
        tableData.push(rowData);
    });

    const data = JSON.stringify(tableData);
    const encodedData = btoa(data); // Base64编码
    const baseUrl = window.location.origin + window.location.pathname;

    // 短链接形式
    const fullLink = `${baseUrl}?data=${encodedData}`;
    const shortLink = fullLink.length > 60 ? fullLink.slice(0, 60) + "..." : fullLink;

    // 更新并显示链接
    document.getElementById("shortLink").href = fullLink;
    document.getElementById("shortLink").textContent = shortLink;
    document.getElementById("linkContainer").style.display = "block";

    // 弹出框展示完整链接
    document.getElementById("modalLink").href = fullLink;
    document.getElementById("modalLink").textContent = fullLink;
    document.getElementById("modal").style.display = "block";
}

// 页面加载时读取数据
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');

    if (encodedData) {
        const decodedData = JSON.parse(atob(encodedData));
        const rows = document.querySelectorAll("#scoreTable tbody tr");

        decodedData.forEach((rowData, index) => {
            const cells = rows[index]?.querySelectorAll("td");
            rowData.forEach((text, cellIndex) => {
                if (cells && cells[cellIndex + 1]) {
                    cells[cellIndex + 1].innerText = text;
                }
            });
        });
    }
});
