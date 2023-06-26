export const navugateTableWithKeyboard = (tableId = "navigableTable", activeCell = 0, focus_navTable_onLoad = true) => {

  let navTable = document.getElementById(tableId) as any;

  navTable.setAttribute('tabindex', -1);

  navTable.addEventListener('focus', function () {
    let focusedTable = document.querySelector('#' + tableId + ':focus') as any;
    if (focusedTable) {
      focusedTable.style.outline = 'none';
    }
  });

  if (focus_navTable_onLoad) {
    navTable.focus();
  }

  let cells = navTable.querySelectorAll('tr td');

  let active = activeCell;

  const makeCellActive = () => {
    let activeTDs = navTable.querySelectorAll('.active');
    for (let i = 0; i < activeTDs.length; i++) {
      activeTDs[i].classList.remove('active');
    }
    cells[active].classList.add('active');
  }


  const calculateActiveCell = (e: any) => {
    let rows = navTable.querySelectorAll('tr').length;
    let columns = navTable.querySelectorAll('tr')[0].childElementCount;

    if (e.keyCode == 37) { //move left or wrap
      active = (active > 0) ? active - 1 : active;
    }
    if (e.keyCode == 38) { // move up
      active = (active - columns >= 0) ? active - columns : active;
    }
    if (e.keyCode == 39) { // move right or wrap
      active = (active < cells.length - 1) ? active + 1 : active;
    }
    if (e.keyCode == 40) { // move down
      active = (active + columns <= cells.length - 1) ? active + columns : active;
    }
  }


  makeCellActive();

  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].innerHTML) {
      cells[i].innerHTML = i;
    }
    cells[i].addEventListener('click', function (e: any) {
      active = Array.prototype.indexOf.call(cells, e.target);
      makeCellActive();
    });
  }


  navTable.addEventListener('keydown', function (e: any) {
    if (e.keyCode == 37 || 38 || 39 || 40) {
      calculateActiveCell(e);
      makeCellActive();
      return false;
    }
  });



}