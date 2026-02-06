import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NewsItem } from '../../api/news';
import { useNavigate } from 'react-router-dom';
import ParseDate from '../../helper/date';

function NewsCard({date, id, title}: NewsItem) {
  const navigate = useNavigate()
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Дата: {ParseDate.DefaultParse(date)}</Card.Subtitle>
        <Card.Link className='link' onClick={() => navigate(`/news/${id}`)}>Подробнее</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default NewsCard