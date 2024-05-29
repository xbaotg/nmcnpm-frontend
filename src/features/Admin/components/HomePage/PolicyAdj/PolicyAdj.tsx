import React, { useState, DragEventHandler } from 'react';
import { Box, Button, Typography, TextField, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from 'axios';

type PolicyAdjustmentProps = {
  initialAgeRange?: [number, number];
  initialTimeGoal?: number;
  initialGoalTypes?: string[];
  initialPoints?: {
    win: number;
    draw: number;
    lose: number;
  };
  initialPlayerCount?: {
    min: number;
    max: number;
  };
  initialForeignPlayers?: number;
};

const defaultPolicySettings = {
  ageRange: [15, 60] as [number, number],
  timeGoal: 90,
  goalTypes: ["A", "B", "C"],
  points: {
    win: 3,
    draw: 1,
    lose: 0,
  },
  playerCount: {
    min: 11,
    max: 18,
  },
  foreignPlayers: 3,
};

export const PolicyAdj = ({
  initialAgeRange = defaultPolicySettings.ageRange,
  initialTimeGoal = defaultPolicySettings.timeGoal,
  initialGoalTypes = defaultPolicySettings.goalTypes,
  initialPoints = defaultPolicySettings.points,
  initialPlayerCount = defaultPolicySettings.playerCount,
  initialForeignPlayers = defaultPolicySettings.foreignPlayers,
}: PolicyAdjustmentProps) => {
  const [ageRange, setAgeRange] = useState<[number, number]>(initialAgeRange);
  const [timeGoal, setTimeGoal] = useState<number>(initialTimeGoal);
  const [goalTypes, setGoalTypes] = useState<string[]>(initialGoalTypes);
  const [points, setPoints] = useState(initialPoints);
  const [playerCount, setPlayerCount] = useState(initialPlayerCount);
  const [foreignPlayers, setForeignPlayers] = useState(initialForeignPlayers);

  const handleAddGoalType = () => {
    setGoalTypes([...goalTypes, ""]);
  };

  const handleRemoveGoalType = (index: number) => {
    setGoalTypes(goalTypes.filter((_, i) => i !== index));
  };

  const handleGoalTypeChange = (index: number, value: string) => {
    const newGoalTypes = [...goalTypes];
    newGoalTypes[index] = value;
    setGoalTypes(newGoalTypes);
  };

  const handlePointsChange = (type: "win" | "draw" | "lose", value: number) => {
    setPoints({ ...points, [type]: value });
  };

  const handleAgeRangeChange = (type: "min" | "max", value: number) => {
    setAgeRange(type === "min" ? [value, ageRange[1]] : [ageRange[0], value]);
  };

  const handleTimeGoalChange = (value: number) => {
    setTimeGoal(value);
  };

  const handlePlayerCountChange = (type: "min" | "max", value: number) => {
    setPlayerCount(type === "min" ? { ...playerCount, min: value } : { ...playerCount, max: value });
  };

  const handleForeignPlayersChange = (value: number) => {
    setForeignPlayers(value);
  };

  const [criteriaList, setCriteriaList] = useState<string[]>([
    'Points',
    'Wins',
    'Losses',
    'Draws',
    'Goal Difference',
    'Goals Scored',
    'Goals Conceded',
  ]);

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const updatedList = [...criteriaList];
      const temp = updatedList[index];
      updatedList[index] = updatedList[index - 1];
      updatedList[index - 1] = temp;
      setCriteriaList(updatedList);
      sendCriteriaListToBackend(updatedList);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < criteriaList.length - 1) {
      const updatedList = [...criteriaList];
      const temp = updatedList[index];
      updatedList[index] = updatedList[index + 1];
      updatedList[index + 1] = temp;
      setCriteriaList(updatedList);
      sendCriteriaListToBackend(updatedList);
    }
  };

  const handleDragOver: DragEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    const dragIndex = Number(event.dataTransfer.getData('text/plain'));
    const index = Number(event.currentTarget.dataset.index);
    if (dragIndex !== index) {
      const updatedList = [...criteriaList];
      const [dragItem] = updatedList.splice(dragIndex, 1);
      updatedList.splice(index, 0, dragItem);
      setCriteriaList(updatedList);
      sendCriteriaListToBackend(updatedList);
    }
  };

  const sendCriteriaListToBackend = async (updatedList: string[]) => {
    try {
      await axios.post('/api/update-criteria', { criteriaList: updatedList });
      console.log('Criteria list updated successfully');
    } catch (error) {
      console.error('Error updating criteria list:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        p: 2,
        minHeight: "100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#37003c",
              fontWeight: 500,
            }}
          >
            Team Policy
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Age Range
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={ageRange[0]}
                onChange={(e) => handleAgeRangeChange("min", Number(e.target.value))}
                label="Min Age"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <TextField
                type="number"
                value={ageRange[1]}
                onChange={(e) => handleAgeRangeChange("max", Number(e.target.value))}
                label="Max Age"
                variant="outlined"
                sx={{ flexGrow: 1, ml: 1 }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Player Count
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={playerCount.min}
                onChange={(e) => handlePlayerCountChange("min", Number(e.target.value))}
                label="Min Players"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
              <TextField
                type="number"
                value={playerCount.max}
                onChange={(e) => handlePlayerCountChange("max", Number(e.target.value))}
                label="Max Players"
                variant="outlined"
                sx={{ flexGrow: 1, ml: 1 }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Number of Foreign Players
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={foreignPlayers}
                onChange={(e) => handleForeignPlayersChange(Number(e.target.value))}
                label="Foreign Players"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#37003c",
              fontWeight: 500,
            }}
          >
            Match Policy
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Time Goal (minutes)
            </Typography>
            <TextField
              type="number"
              value={timeGoal}
              onChange={(e) => handleTimeGoalChange(Number(e.target.value))}
              label="Max Time"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Goal Types
            </Typography>
            {goalTypes.map((type, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <TextField
                  value={type}
                  onChange={(e) => handleGoalTypeChange(index, e.target.value)}
                  label={`Goal Type ${index + 1}`}
                  variant="outlined"
                  sx={{ flexGrow: 1, mr: 1 }}
                />
                <IconButton onClick={() => handleRemoveGoalType(index)}>
                  <RemoveCircleIcon color="error" />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddCircleIcon />}
              onClick={handleAddGoalType}
            >
              Add Goal Type
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.1)",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#37003c",
              fontWeight: 500,
            }}
          >
            League Policy
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Points System
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={points.win}
                onChange={(e) => handlePointsChange("win", Number(e.target.value))}
                label="Points for Win"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={points.draw}
                onChange={(e) => handlePointsChange("draw", Number(e.target.value))}
                label="Points for Draw"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TextField
                type="number"
                value={points.lose}
                onChange={(e) => handlePointsChange("lose", Number(e.target.value))}
                label="Points for Lose"
                variant="outlined"
                sx={{ flexGrow: 1, mr: 1 }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Criteria Priority Adjustment
            </Typography>
            <List>
              {criteriaList.map((criteria, index) => (
                <ListItem key={index} data-index={index} onDragOver={handleDragOver} draggable>
                  <ListItemText primary={criteria} />
                  <ListItemIcon>
                    <IconButton onClick={() => handleMoveUp(index)}>
                      <ArrowUpwardIcon style={{ color: 'green' }} />
                    </IconButton>
                    <IconButton onClick={() => handleMoveDown(index)}>
                      <ArrowDownwardIcon style={{ color: 'red' }} />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PolicyAdj;

