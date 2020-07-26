--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL,
    quantity integer DEFAULT 1
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	Kennedy Liner OG Deck	55	/images/og_liner_deck_kennedy.jpg	Signature Cory Kennedy pro model. 7-ply maple construction. Nothing finer than a Girl OG Liner.	For a lively and durable ride look no further than the Girl Kennedy Horizon 8.12 inch skateboard deck. Moderate concave is certain to add a few new tricks to your rotation, while the classic Girl logo graphic provides iconic flair that is certainly worthy of wall display.
2	 Chocolate Kenny OG Chunk Deck	60	/images/original_chunk.jpg	Signature Kenny Anderson pro model. 7-ply maple construction. Classic beauty for Mr. Tershy!	Throw some color into your skate setup with the Kenny OG Chunk 8.25 inch skateboard deck from Chocolate. This deck features a huge Chocolate logo across the bottom for a ton of branded style, while the bold white, black and red design gives a slick tri-tone look. A moderate concave makes this deck easy to skate at any skill level, while the striking graphic makes it a great wall hanger as well.
3	 Tensor Mag Light Trucks- Black	66	/images/tensor-mag-trucks.jpg	This is for the Tensor, All Terrain, Mag Lights; hollow axle, hollow kingpin.	 Completely redesigned for enhanced skateboarding execution, Tensor re-introduces their 5.25 inch truck in a new Mag Light construction. Dressed up with an eye-catching black colorway, these trucks remain stylish and boast wonderful responsive turning, control, durability and lightweight performance.
4	Ricta Clouds 92a Wheels -Black- 54mm	33	/images/ricta-wheels.jpg	Quick as greased lightning quiet as a highschooler sneaking in after curfew.	Purposely built to allow you to seamlessly transition from the park to the streets with ease, Ricta Wheel's signature Clouds 52mm 78a White Skateboard Wheels provide smooth performance no matter what terrain you find yourself shredding. A do-it-all set of wheels that offer a softer feel, the Clouds are durable and great for any skater at any skill level.
5	Enjoi Whitey Panda Logo R7 Deck	64	/images/enjoi-deck.jpg	Pandas are cute, but they aren't afraid to stand up for themselves. This is the attack stance of our beloved panda. Just a fact.	 Pop your ollies to the moon with the Enjoi Whitey Panda Logo R7 Skateboard Deck 8.0 inch skateboard deck. This deck features mild concave for improved stability, while the wood grain style graphic throughout is complemented by a large panda at the bottom left for a subtle hint of classic branding too.
6	Nike SB Nyjah Free 2.0 Shoes	95	/images/nike-sb.jpg	The Nike SB Nyjah Free delivers the optimal grip of a rubber upper and the snug feel of an internal sleeve.	The Nyjah Free 2 pulls a popular silhouette from the Nike archives, integrating breathable, mesh panels into the rubber uppers of the Spiridon to reserve the durability while adding comfortable air flow to keep you cool. Ghillie loops add a singular style and function, protecting laces and adding to the 3/4 sockliner to ensure a snug, secure fit. Deep grooves in the rubber outsole allow for expansion and contraction so that your every move is complemented and cushioned. The result is a skate shoe that follows the precedent set by it's namesake by encapsulating strength, style and bombast in one sleek package.
7	Independent Reynolds Forged Titanium Trucks	77	/images/independent-trucks.jpg	Skate like The Boss himself with his new signature Reynolds Hollow 139 Stage 11 Block Silver Skateboard Truck.	10% lighter than regular forged Indy's, these Forged Hollow Trucks are an excellent mid-profile truck that grind like regular Indy's without the bulk. Featuring a hollow axle and kingpin, you get 10% weight reduction with all the shred capability you'll ever need.
8	Rout Peaks Pintail Longboard Complete	124	/images/rout-longboard.jpg	The Peaks series was designed with every skateboarder in mind, whether skateboarding is new to you or you've been skating for decades.	The Pintail has a classic shape. A pintail longs to be on the sandy boardwalks whisking through crowds of people. The pintail is the original longboard shape. It takes its style and shape cues from surfboards. Its design begs the rider to get low, to throw hips and shoulders into every turn just like a rider would on a wave. For these reasons, the Architect pintail is the perfect choice for the rider who is looking to transform flat surfaces like sidewalks and streets into concrete waves to carve, cruise, and shred. If youre are always searching for new turns, the Peaks is an incredible ride for your money.
9	Bones Black Swiss Bearings	63	/images/bones-swiss.jpg	Swiss precision bearings. Set of 8 bearings for a smooth rool. Choice of many top skate pros.	Legendary Bones Swiss bearings have been the industry standard ever since they were introduced in 1983, and are still a favorite with professional skaters. Fast, smooth, and very long lasting, they remain unequaled in their class. Set of eight.
10	ProTec Full Cut Certified Snow Helmet	80	/images/pro-tec-helmet.jpg	This original classic Full Cut style has been worn by a handful of top skaters and bikers over the decades.	Progress without the stress of taking a fall that'll put you out for the season. The ProTec Full Cut Certified Snow Helmet is a high-density, injection molded ABS shell helmet with an EPS impact liner that's certified for snow, skate and bike use. Removable and washable interior fit pads help customize your fit while detachable plush-lined ear pads and drop liner help keep you warm throughout the season. Stay warm and confident with this classic Pro-Tec Helmet style.
11	DC Ply 2020 Snowboard Board	240	/images/dc-snowboard.jpg	With a lightweight core and true-twin shape, the DC snowboard will take your park skills to the next level for the 2020 winter season.	Technical parks and features are no match for the DC Ply Snowboard. Featuring DC's Lock & Load Camber, a Stratus Core, and Tear The Roof Off Construction, this is one park ripper that won't let you down when you decide to step up to the bigger park. Designed for a skate-like feel, the Ply has a 3 Degree Bevel that'll boost your confidence on slide tricks while reducing the chance of catching an edge while you're mobbing down to the lodge to recharge.
12	K2 WWW 2020 Snowboard	228	/images/k2-snowboard.jpg	The one board to build your quiver around. Carefully calculated in design, this is the perfect tool if you’re looking for a go-anywhere, do-anything snowboard.	Easy name to remember, even easier board to ride. The K2 WWW 2020 Snowboard's JibTip shape helps reduce swing weight while providing a long running length for maximum control. Easy flex and comfortable in the streets and in the park.
13	K2 Maysis 2021 Snowboard Boots	310	/images/k2-boots.jpg	When you're MO is to make the mountain feel as molehill as an inanimate object can feel, the K2 Maysis is there to assist your stomp. 	The K2 Maysis Snowboard Boots are the best-selling boots in the world for a reason. They've got a super smooth flex that's just on the al dente side of medium, backed up by a double reel Boa system. The Intuition Control liner is super comfy and has a precision fit, and the whole boot is made with K2 s top of the line Endo 2.0 construction. It's like an All-Star team of boot components. Each piece has been hand selected for quality and mass appeal, and integrated with perfection into a true masterpiece of bootsmanship.
14	Adidas Premiere Riding Jacket - Carbon	126	/images/adidas-jacket.jpg	Swing down sweet cherry top. You don't even have to change when you get done ripping the powder all day.	The Premiere Riding jacket has the sleekly-stowed technological features you'll need on the hill but is also civilian-life-appropriate. Now you don't have to be the guy who always has tp throw something in your friends car or the guy who carries a bulky coat around all night at the bar.
15	Salomon Womens Lotus 2020 Snowboard	240	/images/salomon-snowboard.jpg	BiteFree edges and a forgiving Flat Out Camber make the Salomon Womens Lotus 2020 Snowboard a low consequence option for creative riding.	Camber under the back foot for explosive turning capabilities. Quadratic Sidecut blends elliptic curves for easy turn initiation, and fluid edge to edge transitions. Flat segments under the front foot for freedom on fun pow days.  
16	Arbor Cypress Snowboard Bindings	213	/images/bindings.jpg	Designed for riders who prefer their features big and runs rowdy. The Arbor Cypress 2020 Snowboard Binding is a freeride design you can put through the ringer. 	The Cypress is a freeride design for riders who like their lines a little more rowdy and their playgrounds bigger. We've created a powerful binding by stiffening our exclusive System X Baseplate with double the fiberglass; adding a lighter, stiffer and more laterally supportive highback; and beefing up the outsole. That translates into high-speed, big-mountain performance.
17	K2 Sonic 2021 Snowboard Bindings	160	/images/k2-bindings.jpg	The softer side of Sonic offer a bit more flex and the ProFusion&trade Chassis that K2 has made famous.	Simple, tough, and lightweight, the ProFusion™ chassis is the go-to standard in the K2 binding collection. On-board tool-less power ramp and toe strap adjustments to help dial in the perfect fit and ideal power transfer. Angled inward 3 degrees to match your natural leg position during riding, the footbeds provide more support to the outside of the foot for improved control, ollie, and pop. This reduces fatigue allowing you to ride longer and stronger.
18	K2 Bright Lite 2020 Snowboard	228	/images/k2-bright-snowboard.jpg	Designed to be the female-specific quiver of one, the K2 Womens Bright Lite 2020 Snowboard is your go-to shred everything and do it all shape.	A beacon of all-mountain progression, the K2 Bright Lite Snowboard's Directional Rocker Baseline™ makes navigating the entire mountain easy with its mellow rocker and catch-free tip and tail. The softer flexing women's specific Rhythm Core™ is forgiving and playful, making the Bright Lite a fantastic board for up and coming riders who want to discover the entirety of their playground. An all-purpose profile designed to be the perfect companion for the all-terrain snowboarder. Directional Rocker Baseline™ has a medium-rise in the tip and a lower rise in the tail, allowing for effortless turns on hardpack and ample float in soft snow and crud.
19	Channel Islands Surf Ultra Joe Hybrid	690	/images/ultra-joe.jpg	Pure business in the front and all party in the back. Get forward on this user-friendly board and drive from the center and you’ll have all the speed and flow you always desired.	A few years back, we built the Average Joe to be a fun, simple, easy-to-ride board and it became one of our top sellers. For 2019, after rounds of customer feedback and team testing, we’ve created a souped-up, sleeker version…the Ultra Joe. The Ultra Joe boasts foiled rails, a double-bump squash tail, narrower nose with an updated rocker profile, and additional exit rocker. The result is a progressive step forward for beginner/intermediate surfers while at the same time is an inviting step down for average to good surfers seeking something fun and cruisy on the smaller, weaker days. Despite all these changes, one thing remains the same: the fun factor.
20	Sharpeye Storms Surfboard	645	/images/sharpeye-snowboard.jpg	Glide through flat sections with ease on the Storms and make it your new go-to board!	This is the new Kanoa Igarashi pro model for small to medium waves. Kanoa helped japan to win the gold medal on the ISA games riding his prototype in very small conditions. This design was based on the original disco inferno squash. We basically added more area to the nose and created a bump squash on the outline for easier tight turning. We increased the nose thickness pushing the volume forward and kept the same rocker and concaves as the original disco inferno. This board glides through flat sections and it can easily turn in the tighter sections of the wave making a new go to board for all QS warriors.
21	FCS II Reactor PC Carbon Tri Fin Set	115	/images/fcs-fin.jpg	All about speed and agility. Paired with a Performance Carbon Core, what you get is a super dynamic fin ready to slash and pivot with ease.	Dynamic RTM construction with strategically placed carbon compliments the template and sweep angle of the fin, and produce a bespoke flex pattern with remarkable memory properties. In the water this translates to immediate response when loading up the fins and driving through turns. PCC fins suit fast surfing and are favored by power surfers who like to perform explosive turns on critical parts of the wave. Fins with AirCore Technology feature a pressed polyurethane foam core that mimics the geometric foil of the fin. AirCore technology reduces the amount of fiberglass required in the RTM moulding process making it much lighter while allowing total manipulation of the flex.
22	O'Neill Psycho Tech Zip Wetsuit	480	/images/men-wetsuit.jpg	The cold water suit you need to expand your horizons beyond your usual surf spots.	Stitch-less seam technology and TechnoButter 3 neoprene make for unrivaled flexibility, and say goodbye to cold water flushing; F.U.Z.E. chest closure and Z.E.N. back closure systems incorporate anti-flush barriers with drain holes to keep you warmer for longer. O'Neills exclusive, maximum stretch, hydrophobic neoprene with featherlight ENVY foam rubber core. Ultimate warmth and comfort, built to last. Exclusive F.U.Z.E. (Front Upper Zip Entry) system offers a fresh alternative. Using the same free floating zipper technology as the patented Z.E.N. ZIP closure. The F.U.Z.E. closure keeps you dry and allows unrestricted flexibility.
23	Sisstrevolution Seas Zip Wetsuit - Women's	239	/images/womens-wetsuit.jpg	Don't let chilly water get you down, slip into the Sisstrevolution 3/2 7 Seas Back Zip Wetsuit and get after it.	Lesser mortals may fear the cold but with super stretchy, soft limestone based neoprene for unparalleled freedom of movement, glued and bindstitched seams and Glideskin on the neck you'll stay watertight, warm and comfortable. Back zip entry makes it a breeze to pull on and off, while Supratex knee pads provide extra durability without restricting flexibility. Surf's up, sister! 100% Super Stretch Light Limestone Based Neoprene. Thermal Hollow Fiber Lining Insulates and Dries Fast. bluesign®-Approved Dope-Dyed Fabric – Softer, more eco-friendly, and more durable than traditional neoprene.
24	Softech Kyuss Fish FCS II Surfboard	280	/images/softech-surfboard.jpg	A flat and fast small wave killer with impeccable turn capabilities. The Softech Kyuss Fish FCS II Surfboard delivers!	With its swallow tail and tri fin setup, this board is easy to initiate into tight turns. Its FCS II thruster fin setup is easy to swap out with other FCS fins and allows for snappy control. High density polyethylene slick top and bottom skins improve speed and stiffens the overall flex pattern to provide more drive, acceleration and turning response. Make the most of those mushy days with the buoyant, playful, and fun to ride Softech Kyuss Fish FCS II Surfboard.
25	Smith Lowdown XL 2 Sunglasses	129	/images/smith-sunglasses.jpg	Embrace the style, comfort, and performance built into this classic frame. This is who you are now.	The Smith Lowdown XL 2 Sunglasses are a contemporary adaptation of some of Smith s best selling frames. Made with the familiar silhouette of the Lowdown, these glasses come in XL size and non-slip nose pads to keep the new look comfortably secured to your face. A proprietary combination of patented polarization and color management technology creates incredible clarity. ChromaPop lenses maximize color and contrast by improving the speed of visual processing so you see truer color, faster.
26	XCEL 4​/3 Drylock X Wetsuit	500	/images/xcel-wetsuit.jpg	Go big or don't get in the water.	The XCEL 4/3 Drylock X Wetsuit gives you epic performance for shredding the faces off of surf when it's firing, with advanced Celliant Black lining for warmth, light and flexible Japanese limestone neoprene, and seals at the vulnerable places to help keep the icy water out. When you need the good-good, you need the XCEL 4/3 Drylock X Wetsuit. Unrivaled memory and rebound that is lighter, warmer, and softer than the average neoprene with 100% high-performance stretch for comfort and warmth.
27	Stewart Hydro Hull Tuflite Surfboard	975	/images/stewart-surfboard.jpg	The New Hydro Hull is the all-purpose surfboard for those seeking more waves, more fun and more performance.	Bill says this is the best longboard he's ever designed. Historically, the Hydro Hull has been Bill's top selling board worldwide. This next generation Hydro Hull has a modern trim rocker with a single to double concave bottom and is made with Surftech's proprietary Tuflite V-Tech construction process. These features are complimented by a beveled entry rail, which provides forgiveness as well as performance . The 2+1 fin configuration is another proven Bill Stewart innovation that's stood the test of time. The New Hydro Hull is the all-purpose surfboard for those seeking more waves, more fun and more performance.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 1, false);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 1, false);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

