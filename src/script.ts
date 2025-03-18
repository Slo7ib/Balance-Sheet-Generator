document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("add-item")) {
      const section = target.closest("tbody");
      const totalRow = section?.querySelector(".total-row");

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

      section?.insertBefore(newRow, totalRow as Node);
      updateTotals();
    }

    if (target.classList.contains("delete-item")) {
      const row = target.closest("tr");
      row?.remove();
      updateTotals();
    }
  });

  document.body.addEventListener(
    "blur",
    (event) => {
      const target = event.target as HTMLInputElement;
      if (target.type === "number") {
        updateTotals();
      }
    },
    true,
  );

  function updateTotals() {
    const sections = [
      {
        id: "total-current-assets",
        inputs: document.querySelectorAll(
          "#total-current-assets ~ tr input[type='number']",
        ),
      },
      {
        id: "total-fixed-assets",
        inputs: document.querySelectorAll(
          "#total-fixed-assets ~ tr input[type='number']",
        ),
      },
      {
        id: "total-current-liabilities",
        inputs: document.querySelectorAll(
          "#total-current-liabilities ~ tr input[type='number']",
        ),
      },
      {
        id: "total-long-term-liabilities",
        inputs: document.querySelectorAll(
          "#total-long-term-liabilities ~ tr input[type='number']",
        ),
      },
      {
        id: "total-owners-equity",
        inputs: document.querySelectorAll(
          "#total-owners-equity ~ tr input[type='number']",
        ),
      },
    ];

    sections.forEach((section) => {
      const total = Array.from(section.inputs).reduce(
        (sum, input) =>
          sum + parseFloat((input as HTMLInputElement).value || "0"),
        0,
      );
      (document.getElementById(section.id) as HTMLInputElement).value =
        total.toFixed(2);
    });

    const totalAssets =
      parseFloat(
        (document.getElementById("total-current-assets") as HTMLInputElement)
          .value,
      ) +
      parseFloat(
        (document.getElementById("total-fixed-assets") as HTMLInputElement)
          .value,
      );
    (document.getElementById("total-assets") as HTMLInputElement).value =
      totalAssets.toFixed(2);

    const totalLiabilities =
      parseFloat(
        (
          document.getElementById(
            "total-current-liabilities",
          ) as HTMLInputElement
        ).value,
      ) +
      parseFloat(
        (
          document.getElementById(
            "total-long-term-liabilities",
          ) as HTMLInputElement
        ).value,
      );
    (document.getElementById("total-liabilities") as HTMLInputElement).value =
      totalLiabilities.toFixed(2);

    const totalLiabilitiesOwnersEquity =
      totalLiabilities +
      parseFloat(
        (document.getElementById("total-owners-equity") as HTMLInputElement)
          .value,
      );
    (
      document.getElementById(
        "total-liabilities-owners-equity",
      ) as HTMLInputElement
    ).value = totalLiabilitiesOwnersEquity.toFixed(2);
  }
});
