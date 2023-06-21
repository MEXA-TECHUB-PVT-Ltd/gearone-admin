                            //     {/* <Grid xs={12} align="center" p={1}>
                            //         <Box align='center' pt={2} pb={2}>
                            //             {
                            //                 Files.length > 5 ?
                            //                     <Box align='center' sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                            //                         <Grid container spacing={0} pt={5}>
                            //                             <Grid xs={12} align="">
                            //                                 <Stack align="">
                            //                                     <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
                            //                                         <Stack direction="column" spacing={1} >
                            //                                             <Upload sx={{ fontSize: "50px", color: "#808080", ml: 3, pb: 1 }} />
                            //                                             <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Images</span>
                            //                                             <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Max 5</span>

                            //                                         </Stack>
                            //                                     </label>
                            //                                     <input
                            //                                         multiple
                            //                                         style={{ display: "none" }}
                            //                                         id="fileInput"
                            //                                         type="file"
                            //                                         onChange={onChange}
                            //                                         accept="image/*"
                            //                                     />
                            //                                 </Stack>
                            //                             </Grid>
                            //                         </Grid>
                            //                     </Box>
                            //                     : null

                            //             }
                            //             {
                            //                 Files.length > 0?
                            //                     <ImageList align="left" sx={{ width: '700px', height: "200px" }} cols={5} rowHeight={"200px"}>
                            //                         {/* { Files.length(item) => ( */}
                            //                         <>
                            //                             {/* <img key={item} src={URL.createObjectURL(item[0])} alt="Preview" style={{ width: "300px", height: "200px" }} /> */}
                            //                             {Files.length > 0 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[0])}
                            //                                         srcSet={URL.createObjectURL(Files[0])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }
                            //                             {Files.length > 1 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[1])}
                            //                                         srcSet={URL.createObjectURL(Files[1])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }
                            //                             {Files.length > 2 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[2])}
                            //                                         srcSet={URL.createObjectURL(Files[2])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }
                            //                             {Files.length > 3 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[3])}
                            //                                         srcSet={URL.createObjectURL(Files[3])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }
                            //                             {Files.length > 4 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[4])}
                            //                                         srcSet={URL.createObjectURL(Files[4])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }


                            //                         </>
                            //                     </ImageList>
                            //                     : null
                            //             }
                            //             {
                            //                 hidecrossicon ?
                            //                     <Box sx={{ display: "flex", justifyContent: "left", alignContent: "left" }}>
                            //                         <Close sx={{
                            //                             padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px",
                            //                             color: "white", ml: '170px', mt: -30
                            //                         }} onClick={() => clearpreviewimage(0)} />
                            //                     </Box>
                            //                     :
                            //                     null
                            //             }

                            //             {
                            //                 hidecrossicon1 ?
                            //                     <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            //                         <Close sx={{
                            //                             padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px",
                            //                             color: "white", ml: 22, mt: -30
                            //                         }} onClick={() => clearpreviewimage(1)} />
                            //                     </Box>
                            //                     : null

                            //             }

                            //             {
                            //                 hidecrossicon2 ?
                            //                     <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            //                         <Close sx={{
                            //                             padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px",
                            //                             color: "white", ml: -15, mt: -30
                            //                         }} onClick={() => clearpreviewimage(2)} />
                            //                     </Box>
                            //                     : null

                            //             }

                            //             {
                            //                 hidecrossicon3 ?
                            //                     <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            //                         <Close sx={{
                            //                             padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px",
                            //                             color: "white", ml: -50, mt: -30
                            //                         }} onClick={() => clearpreviewimage(3)} />
                            //                     </Box>
                            //                     : null

                            //             }

                            //             {
                            //                 hidecrossicon4 ?
                            //                     <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            //                         <Close sx={{
                            //                             padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px",
                            //                             color: "white", ml: 55, mt: -30
                            //                         }} onClick={() => clearpreviewimage(4)} />
                            //                     </Box>
                            //                     : null

                            //             }

                            //         </Box>
                            //     </Grid> */}













                            



                            // <Grid container spacing={0}>
                            //     <Grid xs={12} align="center" p={1}>
                            //         <Box style={{
                            //     display: 'flex'
                            // }}>

                            //             {hidelabel ?
                            //                 Files &&
                            //                 <>
                            //                     <ImageList align="left" sx={{ width: '700px', height: "200px" }} cols={5} rowHeight={"200px"}>
                            //                         <>
                            //                             {Files.length > 0 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[0])}
                            //                                         srcSet={URL.createObjectURL(Files[0])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }
                            //                             {Files.length > 1 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[1])}
                            //                                         srcSet={URL.createObjectURL(Files[1])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }
                            //                             {Files.length > 2 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[2])}
                            //                                         srcSet={URL.createObjectURL(Files[2])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }
                            //                             {Files.length > 3 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[3])}
                            //                                         srcSet={URL.createObjectURL(Files[3])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }
                            //                             {Files.length > 4 &&
                            //                                 <ImageListItem key={Files.name}>
                            //                                     <img
                            //                                         src={URL.createObjectURL(Files[4])}
                            //                                         srcSet={URL.createObjectURL(Files[4])}
                            //                                         alt={Files.name}
                            //                                         loading="lazy"
                            //                                     />
                            //                                 </ImageListItem>
                            //                             }


                            //                         </>
                            //                         {/* ))
                            //                                 } */}
                            //                     </ImageList>
                            //                     {Files.length < 5 &&
                            //                                     <Stack align="">
                            //                                         <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
                            //                                             <Stack direction="column" spacing={1} >
                            //                                                 <Upload sx={{ fontSize: "50px", color: "#808080", ml: 3, pb: 1 }} />
                            //                                             </Stack>
                            //                                         </label>
                            //                                         <input
                            //                                             multiple
                            //                                             style={{ display: "none" }}
                            //                                             id="fileInput"
                            //                                             type="file"
                            //                                             onChange={onChange}
                            //                                             accept="image/*"
                            //                                         />
                            //                                     </Stack>
                            //                     }
                            //                 </>
                            //                 :
                            //                 <Box align='center' sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                            //                     <Grid container spacing={0} pt={5}>
                            //                         <Grid xs={12} align="">
                            //                             <Stack align="">
                            //                                 <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
                            //                                     <Stack direction="column" spacing={1} >
                            //                                         <Upload sx={{ fontSize: "50px", color: "#808080", ml: 3, pb: 1 }} />
                            //                                         <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Images</span>
                            //                                         <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Max 5</span>

                            //                                     </Stack>
                            //                                 </label>
                            //                                 <input
                            //                                     multiple
                            //                                     style={{ display: "none" }}
                            //                                     id="fileInput"
                            //                                     type="file"
                            //                                     onChange={onChange}
                            //                                     accept="image/*"
                            //                                 />
                            //                             </Stack>
                            //                         </Grid>
                            //                     </Grid>
                            //                 </Box>

                            //             }

                            //             {
                            //                 hidecrossicon ?
                            //                     <Box sx={{ display: "flex", justifyContent: "left", alignContent: "left" }}>
                            //                         <Close sx={{
                            //                             padding: 0.2, backgroundColor: "#FF6700",
                            //                             borderRadius: "50px", color: "white", ml: '110px', mt: -26
                            //                         }} onClick={() => clearpreviewimage()} />
                            //                     </Box>
                            //                     :
                            //                     null
                            //             }
                            //         </Box>
                            //     </Grid>

                            //     <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                            //         <FormControl sx={{ width: "90%" }} align="left">
                            //             <Stack direction="column" spacing={0} pt={2}>
                            //                 <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                            //                     Name
                            //                 </Typography>
                            //                 <OutlinedInput
                            //                     onChange={(event) => {
                            //                         setName(event.target.value);
                            //                     }}
                            //                     id="input-with-icon-adornment"
                            //                     sx={{
                            //                         borderRadius: "50px",
                            //                         backgroundColor: "#F8F8F8",
                            //                         "& fieldset": { border: 'none' },
                            //                     }}
                            //                 />
                            //                 <br />
                            //                 <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                            //                     Price
                            //                 </Typography>
                            //                 <OutlinedInput
                            //                     onChange={(event) => {
                            //                         setPrice(event.target.value);
                            //                     }}
                            //                     id="input-with-icon-adornment"
                            //                     sx={{
                            //                         borderRadius: "50px",
                            //                         backgroundColor: "#F8F8F8",
                            //                         "& fieldset": { border: 'none' },
                            //                     }}
                            //                 />
                            //                 {/* <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                            //                 Screen
                            //             </Typography>
                            //             <Select
                            //                 sx={{
                            //                     borderRadius: "50px",
                            //                     backgroundColor: "#F8F8F8",
                            //                     "& fieldset": { border: 'none' },
                            //                 }}
                            //                 labelId="demo-simple-select-label"
                            //                 id="demo-simple-select"
                            //                 placeholder={Screen}
                            //                 label={Screen}
                            //                 onChange={handleChangeScreen}
                            //             >
                            //                 <MenuItem value="Image Aspects " disabled>
                            //                     <em>select Screen</em>
                            //                 </MenuItem>

                            //                 {Screens.map((data) => (
                            //                     <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                            //                 ))}
                            //             </Select> */}

                            //                 {/* <TextField
                            //                 id="outlined-multiline-static"
                            //                 multiline
                            //                 rows={4}
                            //                 sx={{
                            //                     borderRadius: "20px",
                            //                     backgroundColor: "#F8F8F8",
                            //                     "& fieldset": { border: 'none' },
                            //                 }}
                            //             /> */}

                            //             </Stack>

                            //         </FormControl>

                            //     </Grid>

                            //     <Grid xs={12} md={6} lg={6} xl={6} p={1} align="right" >

                            //         <FormControl sx={{ width: "90%" }} align="left">
                            //             <Stack direction="column" spacing={0} pt={2}>
                            //                 <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                            //                     Category
                            //                 </Typography>




                            //                 <Select
                            //                     sx={{
                            //                         borderRadius: "50px",
                            //                         backgroundColor: "#F8F8F8",
                            //                         "& fieldset": { border: 'none' },
                            //                     }}
                            //                     labelId="demo-simple-select-label"
                            //                     id="demo-simple-select"
                            //                     placeholder={Screen}
                            //                     label={Screen}
                            //                     onChange={handleChangeScreen}
                            //                 >
                            //                     <MenuItem value="Image Aspects " disabled>
                            //                         <em>select Category</em>
                            //                     </MenuItem>

                            //                     {Screens.map((data) => (
                            //                         <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                            //                     ))}
                            //                 </Select>





                            //                 {/* <Select
                            //                 sx={{
                            //                     borderRadius: "50px",
                            //                     backgroundColor: "#F8F8F8",
                            //                     "& fieldset": { border: 'none' },
                            //                 }}
                            //                 labelId="demo-simple-select-label"
                            //                 id="demo-simple-select"
                            //                 placeholder={Screen}
                            //                 label={Screen}
                            //                 onChange={(event) => {
                            //                     setCategory_id(event.target.value);
                            //                 }}

                            //             // onChange={handleChangeScreen}
                            //             >
                            //                 <MenuItem value="Image Aspects " disabled>
                            //                     <em>select Category</em>
                            //                 </MenuItem>

                            //                 {Screens.map((data) => (
                            //                     <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                            //                 ))}
                            //             </Select> */}

                            //                 {/* <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                            //                 Status
                            //             </Typography>
                            //             <Select
                            //                 sx={{
                            //                     borderRadius: "50px",
                            //                     backgroundColor: "#F8F8F8",
                            //                     "& fieldset": { border: 'none' },
                            //                 }}
                            //                 labelId="demo-simple-select-label"
                            //                 id="demo-simple-select"
                            //                 value={Status}
                            //                 label="status"
                            //                 onChange={handleChange}
                            //             >
                            //                 <MenuItem value={true}>True</MenuItem>
                            //                 <MenuItem value={false}>False</MenuItem>
                            //             </Select> */}
                            //                 <br />
                            //                 <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                            //                     Description
                            //                 </Typography>
                            //                 <OutlinedInput
                            //                     onChange={(event) => {
                            //                         setDescription(event.target.value);
                            //                     }}
                            //                     id="input-with-icon-adornment"
                            //                     sx={{
                            //                         borderRadius: "50px",
                            //                         backgroundColor: "#F8F8F8",
                            //                         "& fieldset": { border: 'none' },
                            //                     }}
                            //                 />
                            //                 <br />

                            //             </Stack>

                            //         </FormControl>

                            //     </Grid>

                            //     <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                            //         <FormControl sx={{ width: "90%" }} align="left">
                            //             <Stack direction="column" spacing={0} pt={2}>
                            //                 <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                            //                     location
                            //                 </Typography>
                            //                 <OutlinedInput
                            //                     onChange={(event) => {
                            //                         setLocation(event.target.value);
                            //                     }}
                            //                     id="input-with-icon-adornment"
                            //                     sx={{
                            //                         borderRadius: "50px",
                            //                         backgroundColor: "#F8F8F8",
                            //                         "& fieldset": { border: 'none' },
                            //                     }}
                            //                 />
                            //                 <br />

                            //             </Stack>

                            //         </FormControl>

                            //     </Grid>
                            //     {isloading ?
                            //         <Grid xs={12} align="center">
                            //             <Button variant="contained" style={btn}>
                            //                 <ClipLoader loading={isloading}
                            //                     css={override}
                            //                     size={10}
                            //                 />
                            //             </Button>
                            //         </Grid>

                            //         :
                            //         <Grid xs={12} align="center">
                            //             <Button type='submit' value='Upload'
                            //                 variant="contained" style={btn} onClick={() => { handleAdd() }} >Add</Button>
                            //         </Grid>
                            //     }
                            // </Grid>






                            