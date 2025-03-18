"use strict";
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("add-item")) {
            const section = target.closest("tbody");
            const totalRow = section === null || section === void 0 ? void 0 : section.querySelector(".total-row");
            const newRow = document.createElement("tr");
            newRow.classList.add("grid", "grid-cols-3");
            newRow.innerHTML = `
        <td class="p-2">
          <input type="text" placeholder="New Item" class="w-full border p-1" />
        </td>
        <td></td>
        <td class="flex items-center justify-end gap-2 p-2">
          <input type="number" value="0" step="any" placeholder="0.00" class="w-24 border p-1 text-right" />
          <a class="delete-item flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-red-500 bg-white text-lg text-red-500">-</a>
        </td>
      `;
            section === null || section === void 0 ? void 0 : section.insertBefore(newRow, totalRow);
            updateTotals();
        }
        if (target.classList.contains("delete-item")) {
            const row = target.closest("tr");
            row === null || row === void 0 ? void 0 : row.remove();
            updateTotals();
        }
    });
    document.body.addEventListener("blur", (event) => {
        const target = event.target;
        if (target.type === "number") {
            updateTotals();
        }
    }, true);
    function updateTotals() {
        const sections = [
            {
                id: "total-current-assets",
                inputs: document.querySelectorAll("#total-current-assets ~ tr input[type='number']"),
            },
            {
                id: "total-fixed-assets",
                inputs: document.querySelectorAll("#total-fixed-assets ~ tr input[type='number']"),
            },
            {
                id: "total-current-liabilities",
                inputs: document.querySelectorAll("#total-current-liabilities ~ tr input[type='number']"),
            },
            {
                id: "total-long-term-liabilities",
                inputs: document.querySelectorAll("#total-long-term-liabilities ~ tr input[type='number']"),
            },
            {
                id: "total-owners-equity",
                inputs: document.querySelectorAll("#total-owners-equity ~ tr input[type='number']"),
            },
        ];
        sections.forEach((section) => {
            const total = Array.from(section.inputs).reduce((sum, input) => sum + parseFloat(input.value || "0"), 0);
            document.getElementById(section.id).value =
                total.toFixed(2);
        });
        const totalAssets = parseFloat(document.getElementById("total-current-assets")
            .value) +
            parseFloat(document.getElementById("total-fixed-assets")
                .value);
        document.getElementById("total-assets").value =
            totalAssets.toFixed(2);
        const totalLiabilities = parseFloat(document.getElementById("total-current-liabilities").value) +
            parseFloat(document.getElementById("total-long-term-liabilities").value);
        document.getElementById("total-liabilities").value =
            totalLiabilities.toFixed(2);
        const totalLiabilitiesOwnersEquity = totalLiabilities +
            parseFloat(document.getElementById("total-owners-equity")
                .value);
        document.getElementById("total-liabilities-owners-equity").value = totalLiabilitiesOwnersEquity.toFixed(2);
    }
});
