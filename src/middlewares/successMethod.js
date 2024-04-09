export function successMethod(req, res, next) {
  res['successful (200)'] = payload => {
    res.status(200).json({
      status: 'success',
      payload,
      message: 'Operacion Exitosa!!'
    })
  }
  res['successCreated (201)'] = payload => {
    res.status(201).json({
      status: 'success',
      payload,
      message: 'Recurso Creado Con Exito!!'
    })
  }
  res['successDelete (204)'] = () => {
    res.status(204).json({
      status: 'success',
      message: 'Operacion Realizada Con Exito!!. No Hay Contenido Por Devolver'
    })
  }
  next()
}
