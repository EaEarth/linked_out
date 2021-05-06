import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import JobAnnouncementGrid from '../../components/JobAnnouncement/Grid';
import JobPagination from '../../components/JobAnnouncement/Pagination';
import TagList from '../../components/JobAnnouncement/TagList';
import DefaultLayout from '../../layouts/Default';
import axios from 'axios';
import JobAnnouncement from '../../models/job/JobAnnouncement';
import { GetServerSidePropsContext } from 'next';
import { isServerReq, makeServerAxios } from '../../utils/request';

export const Jobs: React.FC<any> = (props) => {
  const router = useRouter();
  // Data
  const [tags, setTags] = useState(props.tags || []);
  const [jobs, setJobs] = useState(props.jobs || []);
  // Pagination state
  const [pageLen, setPageLen] = useState(1);
  const page = (Number.parseInt(router.query.page as string) || 1) - 1;
  const perPage = 4;
  // On page change
  const goToPage = (e: React.MouseEvent<HTMLElement>, pageNo: number) => {
    e.preventDefault();
    if (pageNo >= 0 && pageNo <= pageLen)
      router.push(
        { href: '/jobs', query: { ...router.query, page: pageNo } },
        undefined,
        {
          shallow: true,
        }
      );
  };

  useEffect(() => {
    setJobs(props.jobs);
    setTags(props.tags || []);
  }, [router.asPath]);

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  //if (isServerReq(context.req)) return { props: {} };
  const searchQuery = context.query.search || '';
  const lowerBoundSalaryQuery = Number(context.query.lowerBoundSalary) || 0;
  const provinceQuery = context.query.province || '';
  let tagQuery = context.query.tags || [];
  if (!Array.isArray(tagQuery) && typeof tagQuery === 'string') {
    tagQuery = tagQuery.split(',');
  }

  const tags = [];
  for (const tag of tagQuery) {
    tags.push({ name: tag });
  }

  try {
    if (context.query.browse) {
      const { data } = await axios.get<JobAnnouncement[]>('job/search', {
        data: {
          search: searchQuery,
          lowerBoundSalary: lowerBoundSalaryQuery,
          province: provinceQuery,
          tag: tagQuery,
        },
      });
      return {
        props: {
          jobs: data,
          tags: tags,
        },
      };
    }
    const { data } = await axios.get<JobAnnouncement[]>('job/index');

    return {
      props: {
        jobs: data,
        tags: tags,
      },
    };
  } catch (err) {
    console.error(err.stack);
    return {
      props: {
        jobs: [],
        tags: tags,
      },
    };
  }
}

export default Jobs;
