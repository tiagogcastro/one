--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adonis_schema; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adonis_schema (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    batch integer NOT NULL,
    migration_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.adonis_schema OWNER TO postgres;

--
-- Name: adonis_schema_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adonis_schema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adonis_schema_id_seq OWNER TO postgres;

--
-- Name: adonis_schema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adonis_schema_id_seq OWNED BY public.adonis_schema.id;


--
-- Name: api_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.api_tokens (
    id integer NOT NULL,
    user_id integer,
    name character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    expires_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.api_tokens OWNER TO postgres;

--
-- Name: api_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.api_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_tokens_id_seq OWNER TO postgres;

--
-- Name: api_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.api_tokens_id_seq OWNED BY public.api_tokens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    avatar character varying(255),
    email_verified_at timestamp with time zone,
    is_activated boolean DEFAULT false NOT NULL,
    password character varying(180) NOT NULL,
    remember_me_token character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: adonis_schema id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adonis_schema ALTER COLUMN id SET DEFAULT nextval('public.adonis_schema_id_seq'::regclass);


--
-- Name: api_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_tokens ALTER COLUMN id SET DEFAULT nextval('public.api_tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: adonis_schema; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adonis_schema (id, name, batch, migration_time) FROM stdin;
1	database\\migrations\\1630822560593_users	1	2022-08-10 11:11:55.990714-03
2	database\\migrations\\1630822560596_api_tokens	1	2022-08-10 11:11:56.035895-03
\.


--
-- Data for Name: api_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.api_tokens (id, user_id, name, type, token, expires_at, created_at) FROM stdin;
15	4	Opaque Access Token	api	8b37a04b926d4839a315c1c0eb6c2dede6ab8ec9160473501f65cb5f14215d59	2022-08-21 00:36:48.999-03	2022-08-20 00:36:49.001-03
16	4	Opaque Access Token	api	9476813a6899c3fa8b80f7396e663bad8795b1ed4e72141605ecd4335bf8d1e0	2022-08-26 22:43:48.274-03	2022-08-25 22:43:48.277-03
17	4	Opaque Access Token	api	9601f7f31bef9ec7a32212188745fe682b22150b85e8f8c251474ac0bd5a7240	2022-08-26 23:13:34.766-03	2022-08-25 23:13:34.766-03
18	4	Opaque Access Token	api	23fac1cf2a9e5dc734f48c3b499decaf003a05db98e7fe0d72e6359dde26d563	2022-08-26 23:14:05.393-03	2022-08-25 23:14:05.393-03
19	4	Opaque Access Token	api	ac0c8cce0da83ad82e7c6396b60bbde215b4077575f691ac246f8d4d96e9fc62	2022-08-26 23:28:04.098-03	2022-08-25 23:28:04.101-03
20	4	Opaque Access Token	api	550dfd7ea08f0fcd15769abdad23313cadb78aa30bf9262d60d90ea77df11ba9	2022-08-26 23:29:56.058-03	2022-08-25 23:29:56.06-03
21	4	Opaque Access Token	api	f7bcb2fda013b1d3376feb672347ff8658e9dd151084fefd399b2ac2425deab1	2022-08-26 23:30:56.29-03	2022-08-25 23:30:56.293-03
22	4	Opaque Access Token	api	752e96ab10c778606189cb053ac61142320e19811f3b8ff833b115f01769fea3	2022-08-26 23:31:06.464-03	2022-08-25 23:31:06.464-03
23	4	Opaque Access Token	api	30916a8adc995ddfef09a9e46243ed8a37617ed313c89cb5d936104b5cf29694	2022-08-26 23:31:09.131-03	2022-08-25 23:31:09.132-03
24	4	Opaque Access Token	api	959aba454aeed9c576e09f76761f4ac95a93adfdcfd07cc0290665dc488424c9	2022-08-26 23:31:33.178-03	2022-08-25 23:31:33.181-03
25	4	Opaque Access Token	api	94b51c6b1572ef0a8a7fb00063d45446ef82c1642cd22df764d60d70710fecde	2022-08-26 23:31:42.79-03	2022-08-25 23:31:42.793-03
26	4	Opaque Access Token	api	efac27fcfcdb62c8d8801b3f05514e63b6798addbeca34ad9997eb6668cc4e20	2022-08-26 23:31:54.357-03	2022-08-25 23:31:54.36-03
27	4	Opaque Access Token	api	e31041873284efd2d937d7956c20213bcab8f454fa85c84503821ccf7a2a395a	2022-08-26 23:32:47.246-03	2022-08-25 23:32:47.249-03
28	4	Opaque Access Token	api	ffac152351ad858fd8124fe81e04332076f7d1e3291a740286e04ed3fb9798b9	2022-08-26 23:32:54.267-03	2022-08-25 23:32:54.27-03
29	4	Opaque Access Token	api	11d457960103a8985f87b9727e2b40b2fe8dad4632338fff3c59fdf0114e6d04	2022-08-26 23:34:45.05-03	2022-08-25 23:34:45.054-03
30	4	Opaque Access Token	api	7f6b85cd6a2f6797a594e17057f100bc19cd5da92a80431925d82d68e017eeb3	2022-08-26 23:35:14.257-03	2022-08-25 23:35:14.26-03
31	4	Opaque Access Token	api	17136a0696711a7787bb535ddc8e8783d3b67ec8d5dfec8caa3bcaae5ec8c46c	2022-08-26 23:36:19.776-03	2022-08-25 23:36:19.779-03
32	4	Opaque Access Token	api	420601b4c2f7ebef50c30891633e0b957c6c8b303e893d12c553c8a627ef9b9e	2022-08-26 23:36:27.861-03	2022-08-25 23:36:27.862-03
33	4	Opaque Access Token	api	3328352e43e9ac1d02c7fa765da3b74d3b69fd7ee2b120f0790ca4ecc40ffedd	2022-08-26 23:39:47.008-03	2022-08-25 23:39:47.01-03
34	4	Opaque Access Token	api	165ff510c21ebc3f98f20f91b6ed8f456ef8f034aeb90e4349c39970be1d1ce8	2022-08-26 23:40:04.193-03	2022-08-25 23:40:04.196-03
35	4	Opaque Access Token	api	e5a8905ecbf661044720451c57c68f35e0b5ef05b9baaa7aeec4120fdedee836	2022-08-26 23:40:30.235-03	2022-08-25 23:40:30.235-03
36	4	Opaque Access Token	api	015d9fd2ddeea4c787b3b5bb0c0559f511529efb75a70ad743c308b3dd15e1c0	2022-08-26 23:41:14.557-03	2022-08-25 23:41:14.559-03
37	4	Opaque Access Token	api	026b633976a7818aa270868732a02e07930182f56edbe9a5982cdc651d73fa1a	2022-08-26 23:41:43.843-03	2022-08-25 23:41:43.845-03
38	4	Opaque Access Token	api	9a284df533e1fcb0dd3b62a86457e0b20c90c68535e7a7356f66f35d45a530ca	2022-08-26 23:41:51.696-03	2022-08-25 23:41:51.697-03
39	4	Opaque Access Token	api	6cdf0d4ac6d23ff1959b5b5bb49e82989c1cb1528614009fc4d44aef1a51d3b6	2022-08-26 23:44:57.713-03	2022-08-25 23:44:57.713-03
40	4	Opaque Access Token	api	3ed885b57a0dfa5afea6dabb4eb271107597c23b3ecb4a6aad6e2566d74747ea	2022-08-26 23:46:07.392-03	2022-08-25 23:46:07.393-03
41	4	Opaque Access Token	api	a54cad8723a554eb208f951c792621be591966c2be64e4307738cde3d5d92dde	2022-08-26 23:47:51.254-03	2022-08-25 23:47:51.257-03
42	4	Opaque Access Token	api	dddfec9bc18cdd39ab44e041163dcabcb3d3695f07596bf559f5ca4f3ae08e74	2022-08-26 23:47:56.319-03	2022-08-25 23:47:56.32-03
43	4	Opaque Access Token	api	9a4663634886b0069fd8737568119954fa43ba794ca3e511e03c01523473b9ae	2022-08-26 23:48:11.51-03	2022-08-25 23:48:11.51-03
44	4	Opaque Access Token	api	5811313ca645836e2cdc4ff0422785986e082e2330f3e9a74286bad1c83e7737	2022-08-26 23:48:13.5-03	2022-08-25 23:48:13.5-03
45	4	Opaque Access Token	api	7dee3fbd4064f7be0fa522d25b0105b76ee12ef625862c8a402905cc0c200ddc	2022-08-26 23:48:16.055-03	2022-08-25 23:48:16.055-03
46	4	Opaque Access Token	api	a9f33f787c02b0b28d4c81ae32e748be7e66e978b1a84364c99a06382cf55ab4	2022-08-26 23:48:53.829-03	2022-08-25 23:48:53.83-03
47	4	Opaque Access Token	api	aa3049ea0614f405242b4abdb3c72fbb32242570ccaf9375d2ab1fad2dbf7882	2022-08-26 23:49:52.343-03	2022-08-25 23:49:52.346-03
48	4	Opaque Access Token	api	76229827756c2892cd085ef8eaa89aa5137e1404750fadb3d643cf0b01822977	2022-08-27 10:25:31.716-03	2022-08-26 10:25:31.717-03
49	4	Opaque Access Token	api	f8439cacaa79a96839e4f25ea8897f4cf2f72db8c8b550e888fb40e3b1ddd94d	2022-08-27 10:25:36.103-03	2022-08-26 10:25:36.104-03
50	4	Opaque Access Token	api	7c79bfdc134259c4bf6aacd778494d2f95419175b6f57c0fd36d56681f014186	2022-08-27 10:25:49.386-03	2022-08-26 10:25:49.386-03
51	4	Opaque Access Token	api	a5838b4ed341c9122be6e5f937a069bfe2caa1dbf32bc3602f04de278d1d42a1	2022-08-27 10:25:55.492-03	2022-08-26 10:25:55.492-03
52	4	Opaque Access Token	api	716c76b4e58acebf0c99a4cd58be9d7b69e8c5f9d8f8b455779c159ac53607c6	2022-08-27 10:26:01.97-03	2022-08-26 10:26:01.97-03
53	4	Opaque Access Token	api	4ba568f9541a7b3af55b5f5a63d7e44ddc2ffdb121beb94df6c17c1ac3545d36	2022-08-27 10:26:11.572-03	2022-08-26 10:26:11.573-03
54	4	Opaque Access Token	api	10f608cb4b1250c0d5bc9a51260644e1edc8cce973f730c64157895a1b32b76c	2022-08-27 10:26:16.093-03	2022-08-26 10:26:16.094-03
55	4	Opaque Access Token	api	a77a9f5e9886a7cfe4005b65e0e1df535d2914b5e226e6556cd5253387b9f174	2022-08-27 10:26:23.794-03	2022-08-26 10:26:23.795-03
56	4	Opaque Access Token	api	617965bc779008c1a0781c10e7f7748f90da33198527d913df4d4bd2bc9e9969	2022-08-27 10:26:29.82-03	2022-08-26 10:26:29.82-03
57	4	Opaque Access Token	api	d42894784662b19762431b09b842e22961ec60807a366ece081d853a986723eb	2022-08-27 10:26:33.874-03	2022-08-26 10:26:33.874-03
58	4	Opaque Access Token	api	b05334054c102ff56d0fedb84803fc598729b4263b08e1054b957b72dd1a5433	2022-08-27 10:27:53.806-03	2022-08-26 10:27:53.806-03
59	4	Opaque Access Token	api	e18d36644c1376b8b267f9ee12e25f637d37180c16a8596f5f2a62eb10e4bfa3	2022-08-27 10:28:12.534-03	2022-08-26 10:28:12.534-03
60	4	Opaque Access Token	api	ad1506478be9fe2d2a94e5a89af6335dba1f971a3db2940a50c91cf725dbcdcf	2022-08-27 10:28:20.604-03	2022-08-26 10:28:20.604-03
61	4	Opaque Access Token	api	3955422a64cb94582906739aa21693683db002ea818e5afd9d3f6d0fab4b1ad9	2022-08-27 10:29:57.129-03	2022-08-26 10:29:57.13-03
62	4	Opaque Access Token	api	b9712bb41ecc38ff0c620ed14f1d6eee4e6e79c3b508a6418dbe3192d03257b6	2022-08-27 10:30:27.437-03	2022-08-26 10:30:27.437-03
63	4	Opaque Access Token	api	34ecef41f236b5b0c42ef07585673ecda0a9197d2d6f4eea8552df094c338273	2022-08-27 10:30:32.02-03	2022-08-26 10:30:32.02-03
64	4	Opaque Access Token	api	bf764c6045881937f210a5f267cae5e4e318582b4e34d7d997a686e1337d0e88	2022-08-27 10:30:47.671-03	2022-08-26 10:30:47.672-03
65	4	Opaque Access Token	api	8510c2f1400c2b58c4d6f39c21563dd6cb432ab8662a1a91f899e93c311a7541	2022-08-27 10:31:08.392-03	2022-08-26 10:31:08.392-03
66	4	Opaque Access Token	api	4ea7a95ff3711cfaa49ddb2fc865cfa798fa59cb37c08f8ec9b88d303df560b2	2022-08-27 10:31:42.664-03	2022-08-26 10:31:42.664-03
67	4	Opaque Access Token	api	0748a7347996a808533eac100d690f8c45adb9dc5985c6d84c0cd88bc32fc112	2022-08-27 10:31:51.321-03	2022-08-26 10:31:51.321-03
68	4	Opaque Access Token	api	d83a0ac1aadf290ce8161edfa70925709c3a682bed49b4ad2fe4552b87895e8c	2022-08-27 10:32:03.479-03	2022-08-26 10:32:03.48-03
69	4	Opaque Access Token	api	e0f39927a082100efe8644b891f04f8937dc0be6b8a785fcafca3b8b99428ff8	2022-08-27 10:41:58.086-03	2022-08-26 10:41:58.086-03
70	4	Opaque Access Token	api	344d77c72504b377f1adfb3615573547e152ebf77e42aa3d45b7a3fb211659f7	2022-08-27 10:42:02.523-03	2022-08-26 10:42:02.523-03
71	4	Opaque Access Token	api	b5a7dcecd89e9c7a780379bdea1d844e6ba3f2a7b3dd35c5f8af1a84fd9add89	2022-08-27 10:42:09.951-03	2022-08-26 10:42:09.952-03
72	4	Opaque Access Token	api	24450d2a9619a5a94c00fc9d51e1503bca92df6df23a147e352e52ca0d8f1029	2022-08-27 10:53:33.329-03	2022-08-26 10:53:33.329-03
73	4	Opaque Access Token	api	f74b47a511939bb6365cf869ccfc03d98d1641418f4a192927ca73718f0e2c57	2022-08-27 10:54:36.113-03	2022-08-26 10:54:36.113-03
74	4	Opaque Access Token	api	0703cf60c94df497382a6cf65f093ffe8057f8a22670a2bcb390744929cc2f74	2022-08-27 10:54:41.581-03	2022-08-26 10:54:41.581-03
75	4	Opaque Access Token	api	997b1be788e4374551fc1cef76a10c40c59406e26002073595884e21185500ec	2022-08-27 12:31:01.846-03	2022-08-26 12:31:01.846-03
76	4	Opaque Access Token	api	fbffc9f7cbdeeb4f9253cd4bbb0b2f869bdb7d6d2f177b184f6c2d1267764540	2022-08-27 12:32:56.915-03	2022-08-26 12:32:56.915-03
77	4	Opaque Access Token	api	03741e3184ceba8fe802fb77a78255ce628fdc7da7e205d6a87904eefd263128	2022-08-27 12:37:41.809-03	2022-08-26 12:37:41.81-03
78	4	Opaque Access Token	api	35b52718b058a85fb414589a7784e25252af9ed4951344e46228197599422f0e	2022-08-27 14:37:04.375-03	2022-08-26 14:37:04.375-03
79	4	Opaque Access Token	api	a8052076e409ca20d4935f6f99d33bfbc20b5d8b09bf54eb4643fd6cb013dc29	2022-08-27 22:22:23.368-03	2022-08-26 22:22:23.368-03
80	4	Opaque Access Token	api	7979abc6a63e72d1be56c353dc3b51a927bce36fb0ff7ce71cd5d419df995f93	2022-08-27 22:25:13.165-03	2022-08-26 22:25:13.165-03
81	4	Opaque Access Token	api	7315cdb861416cc9ab6e5aaba35c561480a10252a6f3cc5de067dd74d8f4629b	2022-08-27 22:51:55.227-03	2022-08-26 22:51:55.228-03
82	4	Opaque Access Token	api	00889fdf078355d561b8b5a7b400cd35fd3ebfa99aded1e008b4dd9bc65256cc	2022-08-27 22:54:38.811-03	2022-08-26 22:54:38.812-03
83	4	Opaque Access Token	api	6f65adc609c79afcf281413c0fbb4ceb1c878bbe872958421002b3debfdb7fcc	2022-08-27 22:55:31.809-03	2022-08-26 22:55:31.809-03
84	4	Opaque Access Token	api	00b0f003c42fd2c61433083d8199cb871651ef6e8b2ae57a929fba43f5338ebd	2022-08-27 22:56:28.368-03	2022-08-26 22:56:28.368-03
85	4	Opaque Access Token	api	9dcfb24dfb072d3bfd89b03ddd2ae49aeb8703b7670348b6600871db1877eeac	2022-08-27 23:02:04.959-03	2022-08-26 23:02:04.959-03
86	4	Opaque Access Token	api	966c5e29b89ad01e04a4218d3a649f79321805ab7565f34295e9a931ff43144b	2022-08-30 19:11:43.088-03	2022-08-29 19:11:43.091-03
87	4	Opaque Access Token	api	823f558654a5a2a740810ed9db3f8489b5cbcf84c06014c9e9b4a6a16b0d9baf	2022-08-30 19:11:51.679-03	2022-08-29 19:11:51.68-03
88	4	Opaque Access Token	api	f4bd9e801bc9812436e12575f3c1bc1462df351a08ba034922d1cffff837f020	2022-08-30 19:13:23.324-03	2022-08-29 19:13:23.324-03
89	4	Opaque Access Token	api	dd859a94460090dae57eb1edeacc75e8d0857624157b7e512fe8936f073302f8	2022-08-30 19:13:35.577-03	2022-08-29 19:13:35.577-03
90	4	Opaque Access Token	api	f1906bb22c1b394576a4e869c6f687b0ee1e372dcf9623a59751d4a18943073b	2022-08-30 19:28:04.508-03	2022-08-29 19:28:04.508-03
91	4	Opaque Access Token	api	459b0167b1a55f3b1c1b52f0c463d1f73b70bdfe47d4cd1145664ac4fdfad7cd	2022-08-30 19:33:52.163-03	2022-08-29 19:33:52.164-03
92	4	Opaque Access Token	api	254e6a5789a801cd25718aa2a0fac50a93f71825eb3bd9f5bfa9ac7fb212fadf	2022-08-30 19:53:55.194-03	2022-08-29 19:53:55.194-03
93	4	Opaque Access Token	api	887a9add785dc40af68682c21c26766603537a0fe39507f57cf557624db17657	2022-08-30 22:06:58.923-03	2022-08-29 22:06:58.923-03
94	4	Opaque Access Token	api	0af2ab20645c15de17e79d51c2c5375c3f0da66450fe952d845cc9bef0bf026a	2022-08-31 14:27:43.776-03	2022-08-30 14:27:43.779-03
95	4	Opaque Access Token	api	dd6d8c15126cd7fef871e72665ef5db447db959229205e42750a7cd704da2855	2022-08-31 17:54:36.395-03	2022-08-30 17:54:36.396-03
96	4	Opaque Access Token	api	d3993d4b46d1d7e79b83bce676286780d9d3a2d17a1e15f7ea3231afeff7ef12	2022-08-31 18:03:10.664-03	2022-08-30 18:03:10.665-03
97	4	Opaque Access Token	api	9697a71ddf6b1f1e11ea6cda96d4ed9ca36628bb58cd0e4cb325a26a9a366722	2022-08-31 18:04:12.483-03	2022-08-30 18:04:12.483-03
98	4	Opaque Access Token	api	4c2b2276d58d027ff83baa4c6736710389b2b45a10d3ef109959865853d1b5ea	2022-09-05 16:10:56.165-03	2022-09-04 16:10:56.171-03
99	4	Opaque Access Token	api	359d91f217666b6dd636dbc604e36ef9c3bfc115836e2f76d69094b48fd3a7c8	2022-09-05 16:11:27.516-03	2022-09-04 16:11:27.516-03
100	4	Opaque Access Token	api	0313e1d33181b798c23b390b8111767f3b5b1660eb44b8167cc2e6b315a505a8	2022-09-05 17:45:50.423-03	2022-09-04 17:45:50.425-03
101	4	Opaque Access Token	api	c80c10920e579ee2aed466254bb4fc7f484a5edc05a81f3f7d39aa13435f1423	2022-09-05 18:14:31.456-03	2022-09-04 18:14:31.457-03
102	4	Opaque Access Token	api	78b55c8b7d46da50c848c6d484726206b9810373ed3b9eae4c45ecb9d04ffe58	2022-09-05 18:20:13.893-03	2022-09-04 18:20:13.893-03
103	4	Opaque Access Token	api	2a64f080fef3fa1183780caefb3f1d974838fca55407eab83c0de03afe15d5eb	2022-09-05 18:22:41.17-03	2022-09-04 18:22:41.17-03
104	4	Opaque Access Token	api	36b26d7ca0ce5b15ead36ca5784c17480705a7b6ac9a5d1e853ac3b7ed2d44ee	2022-09-05 18:23:39.098-03	2022-09-04 18:23:39.099-03
105	4	Opaque Access Token	api	d4dfb0e40a81d33e098f14381e473366b23a224bcc20312fd7a83c885b65e45b	2022-09-05 18:30:35.38-03	2022-09-04 18:30:35.381-03
106	4	Opaque Access Token	api	72bc278af3e7fd5c67660e03f0e3ce907f50555e6d2778eefb4bad902fd6e26b	2022-09-05 18:30:48.326-03	2022-09-04 18:30:48.326-03
107	4	Opaque Access Token	api	f9aa3e01f46f5f459f5da626e7bbb820fc6b3763e2ef6780adeb0f2a3d0b9437	2022-09-05 18:32:08.214-03	2022-09-04 18:32:08.214-03
108	4	Opaque Access Token	api	e24f8e6a0d228e67ab37df826af85957a4e0c9de149c1330ddc6e6f983b59a9b	2022-09-12 18:45:25.571-03	2022-09-11 18:45:25.575-03
109	4	Opaque Access Token	api	a0bdd614302916d2239bc7570f6b980e4a8dfa26cd57a5a22fb0486c138d443b	2022-09-12 18:48:41.653-03	2022-09-11 18:48:41.654-03
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, name, lastname, username, avatar, email_verified_at, is_activated, password, remember_me_token, created_at, updated_at) FROM stdin;
4	rwtumelero@gmail.com	Rafael	Tumelero	rwtumelero	\N	2022-08-20 00:36:31.886-03	t	$bcrypt$v=98$r=10$kK62GUfiNyYh2P9jKDc/Jw$kROYFKX9u8qzen86Yj2AQ2ZuOVLhyM8	\N	2022-08-20 00:36:08.762-03	2022-08-20 00:36:31.887-03
5	testes@gmail.com	Testes	Testes	testes	\N	\N	f	$bcrypt$v=98$r=10$0nYeyd7bHnAVs/DZdPq9rA$U6TyBqht8lcFdNI4DsCKxvWV21nqAmE	\N	2022-08-29 22:17:24.611-03	2022-08-29 22:17:24.611-03
6	ETASR@teste.com	TESSSS	TESTRSA	testeete	\N	\N	f	$bcrypt$v=98$r=10$udupG+fhohjM8j5Yp9MfPg$UQLnudbh0lJAigWT4W/6qTveQAWA+Ik	\N	2022-08-29 22:30:33.505-03	2022-08-29 22:30:33.506-03
7	ststa@tasidjai.com	Testessss	Tesssss	a123isjid	\N	\N	f	$bcrypt$v=98$r=10$/nQVr+9xttbJBquboPes8Q$0W9TABrGgZAMqgSBIToZZROGcZw8mi4	\N	2022-08-29 22:32:16.496-03	2022-08-29 22:32:16.496-03
8	sadasd@adasda.com	ASDASD	asdasda	asd1qdasd	\N	\N	f	$bcrypt$v=98$r=10$lMCHxKqaS/IsXw4a1laBRw$8qLsLHwHfOPFqWIT8KHstuMVQDEcnJ0	\N	2022-08-30 17:56:05.825-03	2022-08-30 17:56:05.826-03
9	asdasd@asdasdsda.com	ASdaDSAS	ASdaSd	sdadsasd	\N	\N	f	$bcrypt$v=98$r=10$oInJO2SxIVEyxedmatL1UQ$kzEcC1NRMEl4l27uj6kkdtlCCMwOyi0	\N	2022-08-30 17:58:01.596-03	2022-08-30 17:58:01.597-03
10	saddasdasd@agasd.com	asdasd	asdas	asdasdasda	\N	\N	f	$bcrypt$v=98$r=10$LDE7h2asPYuxlGpNAV5t4w$mOtMVfaggBENhbVbphBrGxlZSPfXuqo	\N	2022-08-30 18:04:28.243-03	2022-08-30 18:04:28.243-03
11	asdasdasdasd@gasdasd.com	asdsadsa	asdasdasd	rwtumelero@gmail.comasdasdasd	\N	\N	f	$bcrypt$v=98$r=10$xQTqnAI3delkkjAmSSj/2Q$8fbuHEqvVM+NuQJr0oj5iYHI7xran4A	\N	2022-08-30 19:00:23.376-03	2022-08-30 19:00:23.376-03
12	asdasdsa@asdia.com	asdadqweqw	asdqewqe	asdasdsafdsdas	\N	\N	f	$bcrypt$v=98$r=10$H8zwD3i3IL3pVKCEC42OHw$EM3P1E07wMVjX3LnZpgWVUUQB879jEk	\N	2022-08-30 19:01:09.583-03	2022-08-30 19:01:09.583-03
\.


--
-- Name: adonis_schema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adonis_schema_id_seq', 2, true);


--
-- Name: api_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.api_tokens_id_seq', 109, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: adonis_schema adonis_schema_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adonis_schema
    ADD CONSTRAINT adonis_schema_pkey PRIMARY KEY (id);


--
-- Name: api_tokens api_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_tokens
    ADD CONSTRAINT api_tokens_pkey PRIMARY KEY (id);


--
-- Name: api_tokens api_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_tokens
    ADD CONSTRAINT api_tokens_token_unique UNIQUE (token);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: users_id_username_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_id_username_index ON public.users USING btree (id, username);


--
-- Name: api_tokens api_tokens_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.api_tokens
    ADD CONSTRAINT api_tokens_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

