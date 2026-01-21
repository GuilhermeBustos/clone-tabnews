function status(request, response) {
  response.status(200).json({ chave: "API está funcionando corretamente!" });
}

export default status;
