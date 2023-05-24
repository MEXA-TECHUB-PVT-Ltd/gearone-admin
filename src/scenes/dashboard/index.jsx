import React, { useState, useEffect } from "react";
import "../../App.css"
import { Avatar, Box, Typography, Button, Stack, useTheme, Divider, Card, CardContent, Toolbar, TableSortLabel, TableCell, Checkbox, TableHead, TableRow, FormControlLabel, Switch, Paper, TableContainer, Table, TableBody, TablePagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { tokens } from "../../theme";
import Select from '@mui/material/Select';
import totalusers from '../../components/Images/totalusers.png'
import categoriesofworkout from '../../components/Images/categoriesofworkout.png'
import totalworkoutplans from '../../components/Images/totalworkoutplans.png'
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import workout1 from '../../components/Images/workout1.png'
import workout2 from '../../components/Images/workout2.png'
import workout3 from '../../components/Images/workout3.png'
import workout4 from '../../components/Images/workout4.png'
import workout5 from '../../components/Images/workout5.png'
import workout6 from '../../components/Images/workout6.png'
import workout7 from '../../components/Images/workout7.png'
import workout8 from '../../components/Images/workout8.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import url from "../url"
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { Subscriptions, Notifications, Settings, Person, List, Assignment, Lock, People, ArrowForward, ArrowForwardIos, Apps, FilterList, Delete, Visibility, FormatAlignLeft, FormatAlignCenter, Edit, MoreVert } from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  LineChart,
  YAxis,
  Line,
  CartesianGrid
} from "recharts";
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";

const override = {
  display: ' block',
  margin: '0 auto',
  borderColor: 'red',
}

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [allUsers, setAllUsers] = useState('');
  const [allItems, setAllItems] = useState('');
  const [allMerchandise, setAllMerchandise] = useState('');
  const [Items, setItems] = useState([]);
  const [Years, setYears] = useState([]);
  const [MonthUser, setMonthUser] = useState([]);

  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickmenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getAllUsers();
    getAllItems();
    getAllUserMonth(2023);
    getAllYears();
    getAllMerchandise();
    getAllItem();
  }, [])


  const getAllMerchandise = async () => {
    var InsertAPIURL = `${url}merchandise/get_all_merchandise`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `All Merchandise list`) {
          setAllMerchandise(response.count);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text: ''
          })
        }
      }
      )
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: "#FF6700",
          text: 'server error'
        })
      });
  }

  const getAllYears = async () => {
    var InsertAPIURL = `${url}auth/get_years`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `user table's years`) {
          setYears(response.result);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text: ''
          })
        }
      }
      )
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: "#FF6700",
          text: 'server error'
        })
      });
  }


  const getAllItems = async () => {
    var InsertAPIURL = `${url}items/get_all_items`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `User's items data`) {
          setAllItems(response.count);
          setItems(response.result);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text: ''
          })
        }
      }
      )
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: "#FF6700",
          text: 'server error'
        })
      });
  }


  const getAllItem = async () => {
    var InsertAPIURL = `${url}items/get_all_items`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `User's items data`) {
          setItems(response.result);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text: ''
          })
        }
      }
      )
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: "#FF6700",
          text: 'server error'
        })
      });
  }


  const [year, setYear] = React.useState('');
  const handleChange = (event) => {
    setYear(event.target.value);
    getAllUserMonth(event.target.value);
  };


  const getAllUserMonth = async (year) => {
    var InsertAPIURL = `${url}auth/get_monthwise_users`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      "year": year,
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `Monthly added Users`) {
          setMonthUser(response.result);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text: ''
          })
        }
      }
      )
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: "#FF6700",
          text: 'server error'
        })
      });
  }



  const data = [
    {
      "month": "1",
      "count": "10"
    },
    {
      "month": "2",
      "count": "40"
    },
    {
      "month": "3",
      "count": "60"
    },

    {
      "month": "4",
      "count": "50"
    },

    {
      "month": "6",
      "count": "20"
    }
  ]




  const columns = [
    { field: 'name', headerName: <span style={{ color: "black", fontWeight: 600 }}>name</span>, flex: 1 },
    { field: 'price', headerName: <span style={{ color: "black", fontWeight: 600 }}>price</span>, flex: 1 },
    {
      field: 'description',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>description</span>,
      flex: 1,
    },
    {
      field: 'location',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>location</span>,
      flex: 1,
    },
    {
      field: 'promoted',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>promoted</span>,
      flex: 1,
    },
    {
      field: 'added_by',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>added_by</span>,
      flex: 1,
    },

    // {
    //   field: 'id',
    //   headerName: <span style={{ color: "black", fontWeight: 600 }}>Actions</span>,
    //   flex: 1,
    //   renderCell: (row) => {
    //     return (
    //       <>
    //         <div>
    //           <IconButton  >
    //             <Tooltip title="view" >
    //               <Visibility sx={{ color: "#3FC0FF" }} onClick={() => {
    //                 // setViewData(row.row); console.log(row.row);
    //                 // handleOpenmodal()
    //               }} />
    //             </Tooltip>
    //           </IconButton>

    //           <IconButton  >
    //             <Tooltip title="edit" >
    //               <Edit sx={{ color: "#40E0D0" }} onClick={() => navigate("/updatedietplan")} />
    //             </Tooltip>
    //           </IconButton>

    //           <IconButton >
    //             <Tooltip title="Delete">
    //               {/* <Delete sx={{ color: "#E10006" }} onClick={() =>handleOpendelmodal()} /> */}
    //             </Tooltip>
    //           </IconButton>
    //         </div>
    //       </>
    //     );
    //   },
    // },
  ];


  const getAllUsers = async () => {
    var InsertAPIURL = `${url}auth/all_users`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `All User Details`) {
          setAllUsers(response.count);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text: 'Email or Password wrong!'
          })
        }
      }
      )
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: "#FF6700",
          text: 'server error'
        })
      });
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: <span style={{ color: "black", fontWeight: 600 }}>Name</span>,
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: <span style={{ color: "black", fontWeight: 600 }}>Price</span>,
    },
    {
      id: 'description',
      numeric: true,
      disablePadding: false,
      label: <span style={{ color: "black", fontWeight: 600 }}>Description</span>,
    },
    {
      id: 'promoted',
      numeric: true,
      disablePadding: false,
      label: <span style={{ color: "black", fontWeight: 600 }}>promoted </span>,
    },
    {
      id: 'location',
      numeric: true,
      disablePadding: false,
      label: <span style={{ color: "black", fontWeight: 600 }}>Location </span>,
    },

    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: <span style={{ color: "black", fontWeight: 600 }}>Actions</span>,
      renderCell: (row) => {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "start", alignContent: "start", gap: "5px" }}>
              <Tooltip title="View">
                <IconButton>
                  <Visibility />
                </IconButton>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <>
        <Grid xs={12} p={1} align="center">
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={Items}
              getRowId={Items.id}
              id={Items.id}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              // checkboxSelection
              components={{
                Checkbox: ({ value }) => (
                  <Checkbox style={{ color: 'red' }} checked={Items.id} />
                ),
              }}
            />
          </div>
        </Grid>
        {/* <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                style={{ color: '#FF6700' }}
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead> */}
      </>

    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: "white"
            // bgcolor: (theme) =>
            //   alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ bgcolor: "white", flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ color: "transparent", flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}

        {numSelected > 0 ? (
          <Button variant="contained" sx={{
            width: { lg: "16vh", xl: "13vh" },
            bgcolor: "#FF6700",
            boxShadow: "none",
            borderRadius: "50px",
            fontWeight: 600,
            ":hover": {
              bgcolor: "#FF6700",
              boxShadow: "none",
              borderRadius: "50px",
              fontWeight: 600,
              color: "white"
            }
          }}  >Delete All</Button>
          // <Tooltip title="Delete">
          //   <IconButton>
          //     <Delete />
          //   </IconButton>
          // </Tooltip>
        ) : ""}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = Items.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =

    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Items.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(Items, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  const [showtable, setShowtable] = useState(true);

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
        <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={1} >
          <Grid item xs={6} align="" pt={2} >
            <Typography variant="h5" fontWeight={750} pl={3} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#404040">
              Dashboard
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ pb: 2 }} />

        <Grid container spacing={0} mt={2} p={2} >
          <Grid xs={12} md={4} lg={4} xl={4} p={1} align="center">
            <Card sx={{ width: "99%", height: "auto", boxShadow: "0px 3px 6px #00000029" }}>
              <CardContent>
                <Grid container spacing={0} mt={1}>
                  <Grid xs={6} md={8} lg={8} xl={8} pt={0.5} align="left" >
                    <Stack direction="column" spacing={1}>
                      <Typography variant="paragraph" fontWeight={750} sx={{ font: "normal normal normal 18px/32px Roboto", letterSpacing: "1px" }} fontSize="15px" color="#808080" >Total Users</Typography>

                      <Typography variant="h6" fontWeight={850} fontSize="18px" color="#1F1F1F" sx={{ letterSpacing: "2px" }}>{allUsers}</Typography>

                    </Stack>
                  </Grid>

                  <Grid xs={6} md={4} lg={4} xl={4} p={1} align="right" >
                    <img src={totalusers} alt="..." style={{ width: "10vh" }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4} lg={4} xl={4} p={1} align="left">
            <Card sx={{ width: "99%", height: "auto", boxShadow: "0px 3px 6px #00000029" }}>
              <CardContent>
                <Grid container spacing={0} mt={1}>
                  <Grid xs={6} md={8} lg={9} xl={8} pt={0.5} align="left" >
                    <Stack direction="column" spacing={1}>
                      <Typography variant="paragraph" fontWeight={750} sx={{ font: "normal normal normal 18px/32px Roboto", letterSpacing: "1px" }} fontSize="15px" color="#808080" >Total Items</Typography>

                      <Typography variant="h6" fontWeight={850} fontSize="18px" color="#1F1F1F" pt={0.7} sx={{ letterSpacing: "2px" }}>{allItems}</Typography>

                    </Stack>
                  </Grid>

                  <Grid xs={6} md={4} lg={3} xl={4} p={0.5} align="right" >
                    <img src={categoriesofworkout} alt="..." style={{ width: "10vh" }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4} lg={4} xl={4} p={1} align="left">
            <Card sx={{ width: "99%", height: "auto", boxShadow: "0px 3px 6px #00000029" }}>
              <CardContent>
                <Grid container spacing={0} mt={1}>
                  <Grid xs={6} md={8} lg={8} xl={8} pt={0.5} align="left" >
                    <Stack direction="column" spacing={1}>
                      <Typography variant="paragraph" fontWeight={750} sx={{ font: "normal normal normal 18px/32px Roboto", letterSpacing: "1px" }} fontSize="15px" color="#808080" >Merchandise</Typography>

                      <Typography variant="h6" fontWeight={850} fontSize="18px" color="#1F1F1F" sx={{ letterSpacing: "2px" }}>{allMerchandise}</Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={6} md={4} lg={4} xl={4} p={1} align="right" >
                    <img src={totalworkoutplans} alt="..." style={{ width: "10vh" }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={7} md={7} lg={6} xl={7} p={1} align="">
            <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ font: "normal normal bold 22px/32px Roboto", letterSpacing: "1px" }} color="#1F1F1F">
              Items
            </Typography>
          </Grid>

          <Grid xs={12} md={7} lg={7} xl={7} p={1} align="">
            <Grid container spacing={0}>
              {/* list view */}
              {showtable ?
                <Grid xs={12} md={12} >
                  <Box sx={{ width: '100%' }}>
                    <Paper sx={{ backgroundColor: "white", width: '100%', mb: 2 }}>
                      <EnhancedTableToolbar numSelected={selected.length} />
                      <TableContainer>
                        <Table
                          sx={{ bgcolor: "white", minWidth: 750 }}
                          aria-labelledby="tableTitle"
                          size={dense ? 'small' : 'medium'}
                        >
                          <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={Items.length}
                          />
                          <TableBody>
                            {visibleRows.map((row, index) => {
                              const isItemSelected = isSelected(row.id);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={(event) => handleClick(event, row.id)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.name}
                                  selected={isItemSelected}
                                  sx={{ cursor: 'pointer' }}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      style={{ color: '#FF6700' }}
                                      checked={isItemSelected}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">{row.price}</TableCell>
                                  <TableCell align="right">{row.description}</TableCell>
                                  <TableCell align="right">{row.promoted}</TableCell>
                                  <TableCell align="right">{row.location}</TableCell>
                                  <TableCell align="right">
                                    <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "2px" }}>
                                      <Tooltip title="View">
                                        <IconButton>
                                          <Visibility sx={{ color: "#3FC0FF" }} />
                                        </IconButton>
                                      </Tooltip>

                                      <Tooltip title="Edit">
                                        <IconButton>
                                          <Edit sx={{ color: "#40E0D0" }} />
                                        </IconButton>
                                      </Tooltip>

                                      <Tooltip title="Delete">
                                        <IconButton>
                                          <Delete sx={{ color: "#E10006" }} />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                            {emptyRows > 0 && (
                              <TableRow
                                style={{
                                  height: (dense ? 33 : 53) * emptyRows,
                                }}
                              >
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={Items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </Box>
                </Grid>
                : ""
              }


            </Grid>
          </Grid>

          <Grid xs={12} md={5} lg={5} xl={5} sx={{ pt: { xs: 1, lg: 1 } }} pl={1}>

            <Grid xs={12} >
              <Card sx={{ borderRadius: "10px", boxShadow: "0px 3px 6px #00000029" }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={750}
                    fontSize="15px" sx={{ font: "normal normal medium 16px/21px Roboto", letterSpacing: "1px" }} color="#1F1F1F">
                    Total User
                  </Typography>
                  <Typography>Year </Typography>
                  <Select sx={{ mb: '25px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    defaultValue='2023'
                    label="Select A Year"

                    onChange={handleChange}
                  >
                    <MenuItem value="Year " disabled>
                      <em>select a Year</em>
                    </MenuItem>

                    {Years.map((data) => (
                      <MenuItem key={data.id} value={data.year}>{`${data.year}`}</MenuItem>
                    ))}
                  </Select>
                  <LineChart
                    width={600}
                    height={150}
                    data={MonthUser}
                    margin={{
                      top: 5,
                      right: 220,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    {"1 "}
                    <XAxis dataKey="month" />
                    <YAxis dataKey="count" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="black"
                      dot={{ r: 9, stroke: "#FF6700", fill: '#FF6700' }}
                    />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>

          </Grid>

        </Grid>





      </Box >
    </>
  );
};

export default Dashboard;
