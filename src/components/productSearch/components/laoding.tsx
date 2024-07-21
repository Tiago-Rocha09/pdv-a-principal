import { Box, Skeleton } from "@mui/material"

export const Loading = () => {
    return (
        <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
            <Skeleton variant="rectangular" width='100%' height={40} />
        </Box>
    )
}