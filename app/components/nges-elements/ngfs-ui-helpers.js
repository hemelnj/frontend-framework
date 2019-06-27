

export function formatJSON(rowData) {
  let selectedData = [];
  rowData.forEach(function (value, key) {
    selectedData.push(JSON.parse( value ))
  });
  return selectedData;
}

