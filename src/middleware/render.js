const renderMiddleware = (req, res) => {
  if (typeof req.variables.markdown !== 'undefined') {
    res.set('Content-Type', 'text/html')
    res.send(req.variables.markdown)
  }
  else {
    res.status(404)
    res.send('Error file not found')
  }
}

export default renderMiddleware
