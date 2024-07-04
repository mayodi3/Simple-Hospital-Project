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
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import useDoctor from "../hooks/useDoctor";

const DoctorPage = () => {
  const {
    doctors,
    error,
    isEditMode,
    updateDoctor,
    addDoctor,
    newDoctor,
    setNewDoctor,
    setIsEditMode,
    setId,
    deleteDoctor,
  } = useDoctor();

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Box>
      <Box paddingX="30%">
        <Heading textAlign="center">Add a doctor</Heading>
        <FormControl
          isRequired
          onSubmit={isEditMode ? updateDoctor : addDoctor}
        >
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            value={newDoctor.name}
            onChange={(event) =>
              setNewDoctor({ ...newDoctor, name: event.target.value })
            }
          />
          <FormLabel htmlFor="speciality">Speciality</FormLabel>
          <Input
            type="text"
            id="speciality"
            value={newDoctor.speciality}
            onChange={(event) =>
              setNewDoctor({ ...newDoctor, speciality: event.target.value })
            }
          />
          <Button colorScheme="teal" type="submit" marginTop={5}>
            {isEditMode ? "Update" : "Create"} Doctor
          </Button>
        </FormControl>
      </Box>
      <Box marginTop={10}>
        <Heading textAlign="center" marginBottom={5}>
          Doctors
        </Heading>
        <SimpleGrid spacing={4} columns={3}>
          {doctors.map((doctor, index) => (
            <Card key={index}>
              <CardHeader>
                <Heading>{doctor.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text>Speciality : {doctor.speciality}</Text>{" "}
              </CardBody>
              <CardFooter>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  onClick={() => {
                    setNewDoctor({
                      ...newDoctor,
                      name: doctor.name,
                      speciality: doctor.speciality,
                    });
                    setIsEditMode(true);
                    setId(doctor._id);
                  }}
                >
                  Update
                </Button>{" "}
                <Button
                  variant="outline"
                  colorScheme="red"
                  onClick={() => deleteDoctor(doctor._id)}
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

export default DoctorPage;
