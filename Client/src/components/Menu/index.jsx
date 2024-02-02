import { NavLink } from 'react-router-dom'

import {
	Typography,
	Menu as MenuMUI,
	MenuItem,
	Button,
	Box,
} from '@mui/material'

function CollapseMenu({ options, anchor, onClose }) {
	return (
		<MenuMUI
			sx={{ mt: '45px' }}
			id="menu-appbar"
			anchorEl={anchor}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={Boolean(anchor)}
			onClose={onClose}
		>
			{options.map((option) => (
				<MenuItem key={option.label} onClick={onClose}>
					<Typography textAlign="center" component={NavLink} to={option.to}>
						{option.label}
					</Typography>
				</MenuItem>
			))}
		</MenuMUI>
	)
}

function Menu({ options, onClose }) {
	return (
		<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
			{options.map((option) => (
				<Button
					key={option.label}
					onClick={onClose}
					sx={{ my: 2, color: 'white', display: 'block' }}
					component={NavLink}
					to={option.to}
				>
					{option.label}
				</Button>
			))}
		</Box>
	)
}
export { CollapseMenu, Menu }
