import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import { Icon } from "@blueprintjs/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import TableSortLabel from "@material-ui/core/TableSortLabel";

/*SETPRODUCT COMPONENTS*/
import Checkbox from "../Checkbox";
import Paper from "../Paper";
import Button from "../../Button";

import Shape from "./table.module.css";
import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function FuncTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    name,
    position,
    view,
    type,
    color,
    checkboxes
  } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  let setShape;
  type === "dense" ? (setShape = "dense_") : (setShape = "");
  return (
    <TableHead>
      <TableRow>
        {/* if checkable*/}
        {checkboxes && (
          <TableCell>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              color={color}
              className={cx(
                numSelected === rowCount
                  ? View[view + "-head-checked"]
                  : View[view + "-head-unchecked"],
                View["checkbox"]
              )}
            />
          </TableCell>
        )}

        {name.map(
          (row_n, index) =>
            position[index] === "left" ? (
              <TableCell
                key={row_n.id}
                sortDirection={orderBy === row_n.id ? order : false}
                className={cx(
                  orderBy === row_n.id && View["sorted_head"],
                  orderBy === row_n.id && View[setShape + view]
                )}
              >
                <TableSortLabel
                  active={orderBy === row_n.id}
                  direction={order}
                  onClick={createSortHandler(row_n.id)}
                >
                  {row_n.label}
                </TableSortLabel>
              </TableCell>
            ) : (
              <TableCell
                key={row_n.id}
                align={position[index]}
                sortDirection={orderBy === row_n.id ? order : false}
                className={cx(
                  orderBy === row_n.id && View["sorted_head"],
                  orderBy === row_n.id && View[setShape + view]
                )}
              >
                <TableSortLabel
                  active={orderBy === row_n.id}
                  direction={order}
                  onClick={createSortHandler(row_n.id)}
                >
                  {row_n.label}
                </TableSortLabel>
              </TableCell>
            ),
          this
        )}
      </TableRow>
    </TableHead>
  );
}

export default function SPTable(props) {
  const {
    name,
    data,
    position,
    type,
    view,
    color,
    pages,
    classes,
    defRows,
    checkboxes,
    ...rest
  } = props;

  /*PAGINATION FUNCTIONS*/
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    pages ? defRows : data.length
  );
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  /*END PAGINATION*/

  /*SORTING FUNCTIONS*/
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }
  /*END SORTING*/

  /*SELECTION FUNCTIONS*/
  const [selected, setSelected] = React.useState([]);

  function handleSelectAllClick(event) {
    if (selected.length === 0) {
      const newSelecteds = data.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  }

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  }

  const isSelected = id => selected.indexOf(id) !== -1;
  /*END SELECTION*/

  let setShape;
  type === "dense" ? (setShape = "dense_") : (setShape = "");

  return (
    <Paper type={type} view={view} color={color}>
      <Table
        className={cx(
          Shape[type],
          View[type],
          View[view],
          pages && View.pagination,
          Color[color]
        )}
      >
        {/* HEAD */}
        <FuncTableHead
          name={name}
          position={position}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          shape={type}
          view={view}
          color={color}
          checkboxes={checkboxes}
          onSelectAllClick={handleSelectAllClick}
          rowCount={data.length}
          numSelected={selected.length}
        />
        {/*END HEAD*/}
        <TableBody>
          {stableSort(data, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  onClick={event => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  {/* if checkable*/}
                  {checkboxes && (
                    <TableCell>
                      <Checkbox
                        checked={isItemSelected}
                        className={cx(
                          isItemSelected
                            ? View[view + "-body-checked"]
                            : View[view + "-body-unchecked"],
                          View["checkbox"]
                        )}
                      />
                    </TableCell>
                  )}
                  {/*end checkbox */}
                  {name.map((i_name, index) =>
                    position[index] === "left" ? (
                      <TableCell
                        key={i_name.id}
                        className={cx(
                          orderBy === i_name.id && View["sorted_body"],
                          orderBy === i_name.id && View[setShape + view]
                        )}
                      >
                        {row[i_name.id]}
                      </TableCell>
                    ) : (
                      <TableCell
                        align={position[index]}
                        key={i_name.id}
                        className={cx(
                          orderBy === i_name.id && View["sorted_body"],
                          orderBy === i_name.id && View[setShape + view]
                        )}
                      >
                        {row[i_name.id]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {/* if pagination true */}
      {pages && (
        <div style={{ display: "inline" }}>
          {selected.length > 0 && (
            <div
              className={cx(
                Shape[type + "-trash"],
                View[type],
                View[view + "-trash"],
                Color[color]
              )}
              style={{ float: "left" }}
            >
              <Button
                type="none"
                view="none"
                color="none"
                className={cx(
                  Shape[type + "-trash-btn"],
                  View[view + "-trash-btn"]
                )}
              >
                <Icon icon="trash" />
              </Button>
              <div className={Shape["info-text"]}>
                {selected.length} item selected
              </div>
            </div>
          )}
          <TablePagination
            rowsPerPageOptions={rest.rowsPerPageOptions}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelDisplayedRows={() => ""} //"Page " + (page + 1)} <- current page
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage={rest.labelRowsPerPage}
            className={cx(
              Shape[type + "-pag"],
              View[type],
              View[view + "-pag"],
              Color[color]
            )}
          />
        </div>
      )}
    </Paper>
  );
}

SPTable.propTypes = {
  /**
   `The type of the component.
   * Variants: `def` `dense` 
   * Default value (if undefined): `def` `
   */
  type: PropTypes.oneOf(["def", "dense"]),
  /**
   ` The view of the component.
   * Variants: `filled` `flat` `smooth` `raised`
   * Default value (if undefined): `filled` `
   */
  view: PropTypes.oneOf(["filled", "flat", "smooth", "raised"]),
  /**
  ` The color of the component.
   * Variants: `primary` `warning` `danger` `success` `primaryAlt` `warningAlt` `dangerAlt` `successAlt`
   * Default value (if undefined): `default` `
   */
  color: PropTypes.oneOf([
    "default",
    "primary",
    "warning",
    "danger",
    "success",
    "primary_alt",
    "warning_alt",
    "danger_alt",
    "success_alt"
  ]),
  /**
   * Use or not pagination
   */
  pages: PropTypes.bool,
  /**
   * Use or not checkboxes
   */
  checkboxes: PropTypes.bool
};
