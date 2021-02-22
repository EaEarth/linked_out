import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import style from './index.module.scss';

export type Tag = {
  name: string;
};

export type TagListProps = {
  tags: Tag[];
};

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <Row>
      <Col>
        <ul className="list-inline">
          {tags.map((tag, i) => (
            <li key={i} className="list-inline-item">
              <Badge className={`border border-dark ${style['custom-badge']}`}>
                {tag.name}
              </Badge>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export default TagList;
