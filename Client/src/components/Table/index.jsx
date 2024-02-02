import {
  Table as TableMUI,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
} from '@mui/material'

import { Dialog } from 'components'
import { useState } from 'react'

function Table({ columns, rows, onEdit, onDelete }) {
  const [rowForDelete, setRowForDelete] = useState({})
  const [open, setOpen] = useState(false)

  const handleConfirm = row => {
    setRowForDelete(row), setOpen(true)
  }

  const handleClose = () => {
    setRowForDelete({}), setOpen(false)
  }

  const handleDelete = () => {
    onDelete(rowForDelete), handleClose()
  }

  const handleEdit = row => {
    onEdit(row)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <TableMUI sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.label} {...column.props}>
                  {column.label}
                </TableCell>
              ))}

              {(onEdit || onDelete) && (
                <TableCell align="right">Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row._id}>
                {columns.map(column => (
                  <TableCell
                    key={`${row._id} - ${column.label}`}
                    {...column.props}
                  >
                    {row[column.path]}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell align="right">
                    <Stack direction="row" spacing={2} justifyContent="end">
                      {onEdit && (
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(row)}
                        >
                          Editar
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleConfirm(row)
                          }}
                        >
                          Eliminar
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </TableMUI>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        onDelete={handleDelete}
        confirmText="¿Seguro que quieres eliminar el cliente?"
      />
    </>
  )
}

export default Table
