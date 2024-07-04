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
import useAppointment from "../hooks/useAppointment";
import { formatDistanceToNow } from "date-fns";

const AppointmentPage = () => {
  const {
    error,
    isEditMode,
    updateAppointment,
    bookAppointment,
    newAppointment,
    setNewAppointment,
    setIsEditMode,
    appointments,
    deleteAppointment,
    setId,
  } = useAppointment();

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Box>
      <Box paddingX="30%">
        <Heading textAlign="center">Book An Appointment</Heading>
        <FormControl
          onSubmit={isEditMode ? updateAppointment : bookAppointment}
          isRequired
        >
          <FormLabel htmlFor="patientName">Patient Name</FormLabel>
          <Input
            type="text"
            id="patientName"
            name="patientName"
            value={newAppointment.patientName}
            onChange={(event) =>
              setNewAppointment({
                ...newAppointment,
                patientName: event.target.value,
              })
            }
          />
          <FormLabel htmlFor="doctorName">Doctor Name</FormLabel>
          <Input
            type="text"
            id="doctorName"
            name="doctorName"
            value={newAppointment.doctorName}
            onChange={(event) =>
              setNewAppointment({
                ...newAppointment,
                doctorName: event.target.value,
              })
            }
          />
          <Button colorScheme="teal" type="submit" marginTop={5}>
            {isEditMode ? "Update" : "Book"} Appointment
          </Button>
        </FormControl>
      </Box>
      <Box padding={3} marginTop={10}>
        <Heading textAlign="center" marginBottom={5}>
          Appointments
        </Heading>
        <SimpleGrid spacing={4} columns={3}>
          {appointments.map((appointment, index) => (
            <Card key={index}>
              <CardHeader>
                <Heading>{appointment.patientName}</Heading>
              </CardHeader>
              <CardBody>
                <Text>Doctor : {appointment.doctorName}</Text>
                <Text>
                  Created At : {formatDistanceToNow(appointment.createdAt!)} ago{" "}
                </Text>
                <Text>
                  Updated At : {formatDistanceToNow(appointment.updatedAt!)} ago{" "}
                </Text>
              </CardBody>
              <CardFooter>
                <Button
                  variant="outline"
                  colorScheme="teal"
                  onClick={() => {
                    setIsEditMode(true);
                    setNewAppointment({
                      ...newAppointment,
                      patientName: appointment.patientName,
                      doctorName: appointment.doctorName,
                    });
                    setId(appointment._id);
                  }}
                >
                  Update
                </Button>{" "}
                <Button
                  variant="outline"
                  colorScheme="red"
                  onClick={() => deleteAppointment(appointment._id)}
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

export default AppointmentPage;
