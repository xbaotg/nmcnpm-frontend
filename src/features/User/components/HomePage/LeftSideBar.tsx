import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { getMatchesApi } from "features/Admin/components/MatchManager/apis/get-matches";
import { Match } from "features/Admin/components/MatchManager/apis/types";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { TableMatches } from "../TableResults/TableMatches";
import { Link } from "react-router-dom";
import { USER_ROUTES } from "constants/Paths";

export default function LeftSideBar() {
  const [matches, setMatches] = useState<Match[]>();

  useEffect(() => {
    (async () => {
      const response = await getMatchesApi();

      if (response?.status === "success") {
        setMatches(response.data);
      } 
    })();
  }, []);

  const dataDoneMatches = useMemo(() => {
    return matches?.filter((match) => match.finish <= Date.now() / 1000);
  }, [matches]);

  const dataUpcomingMatches = useMemo(() => {
    return matches?.filter(
      (match) => match.start >= Date.now() / 1000 || match.finish === 2 * 10 ** 9,
    );
  }, [matches]);

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ width: "100%" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="357"
            height="52"
            fill="none"
            style={{ width: "100%" }}
          >
            <path fill="url(#a)" d="M0 8a8 8 0 0 1 8-8h341a8 8 0 0 1 8 8v44H0V8Z" />
            <mask id="c" width="357" height="52" x="0" y="0" maskUnits="userSpaceOnUse">
              <path fill="url(#b)" d="M0 7a7 7 0 0 1 7-7h343a7 7 0 0 1 7 7v45H0V7Z" />
            </mask>
            <g mask="url(#c)">
              <path
                fill="url(#d)"
                d="M563.571 138.688c-23.787-11.989-47.243-24.956-70.25-38.963h27.122C467.183 67.297 416.327 29.32 369.188-14.663h22.602c-6.453-6.018-12.858-12.112-19.167-18.357-30.822-30.518-59.12-62.615-84.903-96.028h18.082a948.27 948.27 0 0 1-75.719-114.388h13.562a945.284 945.284 0 0 1-54.617-114.389h9.041a949.6 949.6 0 0 1-34.275-103.028l11.378-11.36a947.786 947.786 0 0 0 49.869 114.388H216a946.691 946.691 0 0 0 69.778 114.389h-13.561c28.448 39.969 60.349 78.236 95.715 114.388H349.85c3.62 3.697 7.263 7.381 10.953 11.035 39.019 38.635 80.788 73.028 124.575 103.353h-22.602c51.978 35.994 106.812 66.228 163.321 90.927l-62.526 62.424v-.003Zm-11.378 11.359c-56.511-24.698-111.342-54.932-163.32-90.927h22.602C367.691 28.796 325.922-5.597 286.9-44.232a969.783 969.783 0 0 1-10.953-11.036h18.082c-35.367-36.151-67.267-74.419-95.716-114.388h13.562a946.242 946.242 0 0 1-69.778-114.388h9.04a947.147 947.147 0 0 1-49.868-114.388l-11.378 11.359a949.413 949.413 0 0 0 34.275 103.029h-9.041a946.315 946.315 0 0 0 54.616 114.388H156.18a948.644 948.644 0 0 0 75.718 114.388h-18.081A962.572 962.572 0 0 0 298.72 40.76c6.308 6.245 12.714 12.34 19.166 18.357h-22.602c47.143 43.981 97.996 81.961 151.256 114.388h-27.122c23.007 14.007 46.462 26.975 70.25 38.963l62.525-62.424v.003ZM700 2.479c-56.512-24.698-111.342-54.932-163.32-90.926h22.602c-43.784-30.325-85.553-64.718-124.576-103.353a973.093 973.093 0 0 1-10.952-11.036h18.081c-35.366-36.151-67.266-74.419-95.715-114.388h13.561a946.497 946.497 0 0 1-69.778-114.388h9.041A947.147 947.147 0 0 1 249.076-546l-11.378 11.36a949.593 949.593 0 0 0 34.274 103.028h-9.04a946.244 946.244 0 0 0 54.616 114.388h-13.561a948.342 948.342 0 0 0 75.718 114.388h-18.082a962.524 962.524 0 0 0 84.904 96.029c6.308 6.245 12.714 12.339 19.166 18.356h-22.602C490.234-44.47 541.086-6.49 594.347 25.937h-27.123c23.007 14.008 46.463 26.975 70.251 38.963L700 2.476v.003ZM330.306 371.576c-56.512-24.698-111.343-54.933-163.321-90.927h22.602c-43.784-30.325-85.552-64.718-124.575-103.353a976.379 976.379 0 0 1-10.953-11.035h18.082C36.775 130.109 4.874 91.841-23.574 51.873h13.561A946.443 946.443 0 0 1-79.791-62.515h9.04a947.24 947.24 0 0 1-49.868-114.389L-132-165.541A949.429 949.429 0 0 0-97.725-62.512h-9.041A946.305 946.305 0 0 0-52.15 51.876H-65.71a948.566 948.566 0 0 0 75.718 114.388H-8.074a962.575 962.575 0 0 0 84.903 96.028c6.308 6.245 12.714 12.339 19.166 18.357H73.393c47.143 43.981 97.996 81.961 151.256 114.388h-27.122c23.007 14.007 46.463 26.975 70.25 38.963l62.525-62.424h.004Zm147.806-147.568c-56.511-24.698-111.342-54.932-163.32-90.927h22.602c-43.784-30.324-85.552-64.717-124.575-103.352a969.783 969.783 0 0 1-10.953-11.036h18.082c-35.367-36.151-67.267-74.419-95.715-114.388h13.561a946.436 946.436 0 0 1-69.778-114.388h9.04a947.165 947.165 0 0 1-49.868-114.388L15.81-313.112a949.54 949.54 0 0 0 34.275 103.029h-9.041A946.333 946.333 0 0 0 95.66-95.695H82.1a948.642 948.642 0 0 0 75.717 114.388h-18.081a962.524 962.524 0 0 0 84.903 96.028c6.308 6.245 12.714 12.34 19.166 18.357h-22.602c47.143 43.981 97.996 81.961 151.256 114.388h-27.122c23.007 14.007 46.463 26.975 70.25 38.963l62.525-62.424v.003Zm-73.903 73.784c-56.512-24.698-111.342-54.933-163.32-90.927h22.602c-43.784-30.324-85.553-64.717-124.576-103.353a975.504 975.504 0 0 1-10.952-11.035h18.081c-35.366-36.151-67.267-74.42-95.715-114.388H63.89A946.47 946.47 0 0 1-5.888-136.3h9.041a947.121 947.121 0 0 1-49.868-114.389l-11.378 11.36A949.664 949.664 0 0 0-23.82-136.299h-9.04A946.344 946.344 0 0 0 21.757-21.911H8.196A948.562 948.562 0 0 0 83.914 92.477H65.832a962.722 962.722 0 0 0 84.903 96.028c6.309 6.245 12.714 12.339 19.167 18.357H147.3c47.143 43.981 97.995 81.961 151.256 114.388h-27.123c23.007 14.007 46.463 26.975 70.251 38.963l62.525-62.424v.003Z"
              />
            </g>
            <defs>
              <linearGradient
                id="a"
                x1="81.037"
                x2="189.79"
                y1="-89.5"
                y2="150.677"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".2" stop-color="#05F0FF" />
                <stop offset=".81" stop-color="#7367FF" />
                <stop offset="1" stop-color="#963CFF" />
              </linearGradient>
              <linearGradient
                id="b"
                x1="164.756"
                x2="180.189"
                y1="-25.669"
                y2="89.052"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".2" stop-color="#05F0FF" />
                <stop offset=".81" stop-color="#7367FF" />
                <stop offset="1" stop-color="#963CFF" />
              </linearGradient>
              <linearGradient
                id="d"
                x1="236.672"
                x2="1091.6"
                y1="-1035.39"
                y2="-369.305"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".2" stop-color="#05F0FF" />
                <stop offset=".81" stop-color="#7367FF" />
                <stop offset="1" stop-color="#963CFF" />
              </linearGradient>
            </defs>
          </svg>
        </Box>

        <img
          src="assets/images/main/competition_1_small.png"
          alt="logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "5%",
            height: "40px",
            transform: "translateY(-50%)",
          }}
        />

        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
          }}
        >
          Recent Matches
        </Typography>
      </Box>

      <Box
        sx={{
          border: "2px solid #f5f2f5",
          p: 2,
          paddingTop: 0,
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.8rem",
              margin: "0.5rem",
              textAlign: "center",
            }}
          >
            All times shown are your local time
          </Typography>

          <TableMatches
            useShortName={true}
            mini={true}
            matches={dataUpcomingMatches}
            sortAsc={true}
            limit={2}
          />
          <Divider />
          <TableMatches useShortName={true} mini={true} matches={dataDoneMatches} limit={2} />
        </Box>

        <Box>
          <Link to={USER_ROUTES.FIXTURES}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "5px",
                border: "0.5px solid #37003c",
                backgroundColor: "white",
                color: "#37003c",
                boxShadow: "0",
                "&:hover": {
                  backgroundColor: "#f5f2f5",
                },
              }}
            >
              View All Fixtures
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
