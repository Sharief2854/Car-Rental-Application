import React from 'react';
import { Card, CardTitle, CardText, CardBody, CardFooter, Container, Row, Col } from 'reactstrap';
import './blogs.css';
import HomeNavBar from '../home-navbar/homeNavBar';

// A sample array of blog posts
const posts = [
    {
        id: 1,
        title: 'The Benefits Of Renting A Car For Your Next Trip',
        author: 'Rachana',
        date: '2024-02-06',
        content: 'Renting a car could be the perfect solution for your travel needs.Some of benefits-Cost Effective,Flexibility and Freedom...',
        image: './images/Blogs/car1.jpeg'
    },
    {
        id: 2,
        title: 'The best destinations for road trips',
        author: 'Yashwanth',
        date: '2024-01-30',
        content: 'Renting a self driven car without unknown person can make us so better without any hesitation and it makes beautiful memories without any disturbance and having our own freedom  ...',
        image: './images/Blogs/car2.jpeg'
    },
    {
        id: 3,
        title: 'How To Choose The Right Rental Car For Your Needs',
        author: 'Shirisha',
        date: '2024-01-15',
        content: 'Renting a car can offer convenience, flexibility so determine your requirements,Vehicle Type...',
        image: './images/Blogs/car3.jpeg'
    },

    {
        id: 4,
        title: 'Tips and tricks for saving money on car rentals',
        author: 'Shakshi',
        date: '2024-01-10',
        content: 'Book early — especially during peak travel season, Use a credit card that will cover primary insurance ...',
        image: './images/Blogs/car4.jpeg'
    },
    {
        id: 5,
        title: 'How Can Technology Impact The Car Rental Industry?',
        author: 'Arjun',
        date: '2024-01-05',
        content: 'There has been a dramatic shift in the vehicle rental industry over the years. In response to changes in consumer behavior and more advanced technology, car rental demand has increased....',
        image: './images/Blogs/car5.jpeg'
    }

];

// A functional component that renders a single blog post as a card
function Post({ blog }) {
    return (
        <>
            
            <Col md="4">
                <Card className="mb-4">
                    <CardBody>
                        <CardTitle tag="h4">{blog.title}</CardTitle>
                        <CardText>{blog.content}</CardText>
                        <CardText><b>By {blog.author}</b></CardText>
                        <img src={blog.image} alt="Car"  className='img'/>
                    </CardBody>
                    <CardFooter >{blog.date}</CardFooter>
                </Card>
            </Col>
        </>
    );
};

// A functional component that renders a list of blog posts as a container
function Blog() {
    return (
        <div>
            <HomeNavBar/>
            <Container>
                
                <h1 className="blog-title"><u><b>CARZY-Car Rental Blog</b></u></h1>
                <br></br>
                <Row>
                    {posts.map(blog => <Post key={blog.id} blog={blog} />)}
                </Row>
            </Container>
        </div>
    );
};

export default Blog;