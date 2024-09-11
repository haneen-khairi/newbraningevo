import { Table } from "antd";
import TableTopbar from "./TableTopbar";
import { GridLoader } from "react-spinners";
export default function ComplexTable({
  title,
  downloadFunction,
  filterMenu,
  searchFunction,
  statusList,
  statusFilter,
  addFunction,
  columns,
  data,
  addText,
  tableTitle,
  hasSearch = true,
  items,
  hasMultiAdd=false,
  hasAdd = true,
  hasDownload = true,
  hasFilter = true,
  hasStatusFilter = true,
  loading = false,
  onChange,
  paginationConfig,
  ...props
}) {
  console.log("🚀 ~ data in complex:", data)
  return (
    <>
      <TableTopbar
        title={title}
        downloadFunction={downloadFunction}
        filterMenu={filterMenu}
        searchFunction={searchFunction}
        statusList={statusList}
        statusFilter={statusFilter}
        addFunction={addFunction}
        addText={addText}
        items={items}
        hasMultiAdd={hasMultiAdd}
        tableTitle={tableTitle}
        hasSearch={hasSearch}
        hasAdd={hasAdd}
        hasDownload={hasDownload}
        hasFilter={hasFilter}
        hasStatusFilter={hasStatusFilter}
      />
      <Table
        className="mt-4"
        columns={columns}
        loading={{
          spinning: loading,
          indicator: <GridLoader color="#012070" />,
        }}
        dataSource={data}
        onChange={onChange}
        pagination={paginationConfig}
        {...props}
      ></Table>
    </>
  );
}
