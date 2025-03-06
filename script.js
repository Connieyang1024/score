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
    const encodedData = encodeURIComponent(data);
    const uniqueKey = Date.now(); // 确保每次都有唯一标识

    // 生成带数据的链接
    const baseUrl = window.location.origin + window.location.pathname;
    const fullLink = `${baseUrl}?data=${encodedData}&key=${uniqueKey}`;

    // 显示短链接
    const shortLink = fullLink.length > 60 ? fullLink.slice(0, 60) + "..." : fullLink;

    document.getElementById("shortLink").href = fullLink;
    document.getElementById("shortLink").textContent = shortLink;
    document.getElementById("linkContainer").style.display = "block";

    alert("请保存该链接以便下次继续填写！");
}

// 页面加载时读取数据
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    if (data) {
        const savedData = JSON.parse(decodeURIComponent(data));
        const rows = document.querySelectorAll("#scoreTable tbody tr");

        savedData.forEach((rowData, index) => {
            const cells = rows[index]?.querySelectorAll("td");
            rowData.forEach((text, cellIndex) => {
                if (cells && cells[cellIndex + 1]) {
                    cells[cellIndex + 1].innerText = text;
                }
            });
        });
    }
});
