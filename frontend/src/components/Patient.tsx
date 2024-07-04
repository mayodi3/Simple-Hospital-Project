import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import usePatient from "../hooks/usePatient";

const PatientPage = () => {
  const {
    patients,
    error,
    isEditMode,
    updatePatient,
    admitPatient,
    newPatient,
    setNewPatient,
    setIsEditMode,
    setId,
    deletePatient,
  } = usePatient();

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Box>
      <Box paddingX="30%">
        <Heading textAlign="center">Admit A Patient</Heading>
        <FormControl onSubmit={isEditMode ? updatePatient : admitPatient}>
          <FormLabel htmlFor="name">Name </FormLabel>
          <Input
            type="text"
            id="name"
            value={newPatient.name}
            onChange={(event) => {
              setNewPatient({ ...newPatient, name: event.target.value });
            }}
          />{" "}
          <FormLabel htmlFor="age">Age </FormLabel>
          <Input
            type="number"
            id="age"
            value={newPatient.age}
            onChange={(event) =>
              setNewPatient({ ...newPatient, age: event.target.value })
            }
          />
          <FormLabel htmlFor="gender">Gender </FormLabel>
          <Select
            id="gender"
            value={newPatient.gender}
            placeholder="Select Gender"
            onChange={(event) =>
              setNewPatient({ ...newPatient, gender: event.target.value })
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
          <Button colorScheme="teal" type="submit" marginTop={5}>
            {isEditMode ? "Update" : "Admit"} Patient
          </Button>
        </FormControl>
      </Box>
      <Box marginTop={10}>
        <Heading textAlign="center" marginBottom={5}>
          Patients
        </Heading>
        <SimpleGrid spacing={4} columns={3}>
          {patients.map((patient) => (
            <Card key={patient._id}>
              <CardHeader>
                <Heading>{patient.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text> Age : {patient.age}</Text>
                <Text>Gender : {patient.gender}</Text>
              </CardBody>
              <CardFooter>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  onClick={() => {
                    setIsEditMode(true);
                    setNewPatient({
                      ...newPatient,
                      name: patient.name,
                      age: patient.age,
                      gender: patient.gender,
                    });
                    setId(patient._id);
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="outline"
                  colorScheme="red"
                  onClick={() => deletePatient(patient._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default PatientPage;
