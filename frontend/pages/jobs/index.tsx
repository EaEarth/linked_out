import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import JobAnnouncementGrid from '../../components/JobAnnouncement/Grid';
import JobPagination from '../../components/JobAnnouncement/Pagination';
import TagList from '../../components/JobAnnouncement/TagList';
import DefaultLayout from '../../layouts/Default';

const mockJobs = [
  {
    role: 'Programmer',
    createdAt: '1 day ago',
    location: 'Bangkok, Thailand',
    companyName: 'Wongnai',
    image: '/images/company/wongnai.jpg',
  },
  {
    role: 'Full-stack Developer',
    createdAt: '4 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'Wongnai',
    image: '/images/company/wongnai.jpg',
  },
  {
    role: 'Programmer',
    createdAt: '3 weeks ago',
    location: 'Bangkok, Thailand',
    companyName: 'Thinknet',
    image: '/images/company/thinknet.jpg',
  },
  {
    role: 'Programmer',
    createdAt: '5 days ago',
    location: 'Bangkok, Thailand',
    companyName: 'Bluebik',
    image: '/images/company/bluebik.jpg',
  },
  {
    role: 'Software Engineer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'Bitkub',
    image: '/images/company/bitkub.jpg',
  },
  {
    role: 'Programmer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'SCG',
    image: '/images/company/scg.jpg',
  },
  {
    role: 'Programmer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'KBTG',
    image: '/images/company/kbtg.png',
  },
  {
    role: 'Programmer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'Central',
    image: '/images/company/central.png',
  },
  {
    role: 'Web Developer',
    createdAt: '11 hours ago',
    location: 'Bangkok, Thailand',
    companyName: 'Skooldio',
    image: '/images/company/skooldio.png',
  },
];

const mockTags = [
  { name: 'โปรแกรมเมอร์' },
  { name: 'แพทย์' },
  { name: 'การตลาด' },
  { name: 'บัญชี' },
];

export const Jobs: React.FC<any> = (props) => {
  const router = useRouter();
  // Data
  const [tags] = useState(props.tags || []);
  const [jobs] = useState(props.jobs || []);
  // Pagination state
  const [pageLen, setPageLen] = useState(1);
  const page = (Number.parseInt(router.query.page as string) || 1) - 1;
  const perPage = 4;
  // On page change
  const goToPage = (e: React.MouseEvent<HTMLElement>, pageNo: number) => {
    e.preventDefault();
    if (pageNo >= 0 && pageNo <= pageLen)
      router.push(`/jobs?page=${pageNo}`, undefined, { shallow: true });
  };
  // Update page length
  useEffect(() => {
    setPageLen(Math.ceil(jobs.length / perPage));
  }, [jobs]);
  // Render
  return (
    <DefaultLayout>
      <Head>
        <title>Job Announcements - LinkedOut</title>
      </Head>
      <Container className="mt-4">
        <TagList tags={tags} />
        <JobAnnouncementGrid
          jobs={jobs.slice(page * perPage, (page + 1) * perPage)}
        />
        <JobPagination
          page={page}
          pageLength={pageLen}
          onPageChange={goToPage}
        />
      </Container>
    </DefaultLayout>
  );
};

export async function getServerSideProps(context) {
  // TODO: Fetch from backend
  return {
    props: {
      jobs: mockJobs,
      tags: mockTags,
    },
  };
}

export default Jobs;
