import { Tooltip, IconButton as IconButtonMUI } from '@mui/material'

function IconButton({ icon, tooltip, color, onClick }) {
	const Icon = icon
	return (
		<Tooltip title={tooltip}>
			<IconButtonMUI onClick={onClick}>
				<Icon color={color} />
			</IconButtonMUI>
		</Tooltip>
	)
}
export default IconButton
