import React, { useState } from 'react';
import axios from "axios";
import logo from "./assets/chatgpt-logo.png";
import { Modal, Box, Typography, TextField, LinearProgress } from '@mui/material';
import GPTResponse from './components/GPTResponse';


function App() {
  const HOST_URL = "http://localhost:3000";
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("")
    setLoading(true);
    const res = await axios.post(`${HOST_URL}/workflow/chat`, {prompt});
    console.log(res);
    setLoading(false);
    setResponse(res);
  }

  return (
    <div className="app">
      <img src={logo} /> 
      <button className="btn" onClick={handleOpen}>Ask me anything!</button>

      
      <Modal
        open={open}
        onClose={handleClose}
        className="chatgpt-modal"
      >
          <Box className="container">
            <div>
              <Typography variant="h6" component="h2">
                Drop your Questions
              </Typography>
              <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
                <TextField value={prompt} onChange={(e) => {setPrompt(e.target.value)}} id="outlined-basic" label="Query" variant="outlined" sx={{margin: "15px 0", width: "100%"}} />
                <button className="btn">Submit</button>
              </form>
            </div>

            {loading && <LinearProgress />}
            {response && <GPTResponse response={response} />}
          </Box>
      </Modal>
    </div>
  )
}

export default App
