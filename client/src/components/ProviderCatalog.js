import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

const ProviderCatalog = () => {
    const navigate = useNavigate();

    const [providerData, setProviderData] = useMutation(GET_PROVIDERS);
  
    const providerData = data?.me || {};
  
    if (loading) {
      return <h2>LOADING...</h2>;
    }
  
    return (
      <>
        <Container>
          <h2>
            {providerData.service?.length
              ? `Viewing ${providerData.service.length} saved ${
                  providerData.service.length === 1
                    ? "Appointments"
                    : "Appointments"
                }:`
              : "You have no saved Appointments!"}
          </h2>
          <CardColumns>
            {providerData.service?.map((appt) => {
              return (
                <Card key={appt.apptId} border="dark">
                  <Card.Body>
                    <Card.Title>{appt.userBooking}</Card.Title>
                    <p className="small">Provider: {appt.providerBooking}</p>
                    <p className="small">Appointment Length: {appt.apptLength}</p>
                    <p className="small">Appointment Date: {appt.apptDate}</p>
                    {/* <Card.Text>{book.description}</Card.Text> */}
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteAppt(appt.apptId)}
                    >
                      Cancel this Appointment!
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      </>
    );
  };