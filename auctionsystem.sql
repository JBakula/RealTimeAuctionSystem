PGDMP     
                    {           auctionsystem    15.2    15.2 !    !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    32944    auctionsystem    DATABASE     �   CREATE DATABASE auctionsystem WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE auctionsystem;
                postgres    false            �            1259    32971    Auction    TABLE     c  CREATE TABLE public."Auction" (
    "AuctionId" integer NOT NULL,
    "Title" character varying(100) NOT NULL,
    "Description" character varying,
    "StartingPrice" numeric(11,2) NOT NULL,
    "CategoryId" integer,
    "StartsAt" timestamp without time zone NOT NULL,
    "EndsIn" timestamp without time zone NOT NULL,
    "Image" character varying
);
    DROP TABLE public."Auction";
       public         heap    postgres    false            �            1259    32970    Auction_AuctionId_seq    SEQUENCE     �   ALTER TABLE public."Auction" ALTER COLUMN "AuctionId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Auction_AuctionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    32984    Bid    TABLE     �   CREATE TABLE public."Bid" (
    "BidId" integer NOT NULL,
    "Value" numeric(11,2) NOT NULL,
    "AuctionId" integer NOT NULL,
    "UserId" integer NOT NULL
);
    DROP TABLE public."Bid";
       public         heap    postgres    false            �            1259    32983    Bid_BidId_seq    SEQUENCE     �   ALTER TABLE public."Bid" ALTER COLUMN "BidId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Bid_BidId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    32946    Category    TABLE     y   CREATE TABLE public."Category" (
    "CategoryId" integer NOT NULL,
    "CategoryName" character varying(50) NOT NULL
);
    DROP TABLE public."Category";
       public         heap    postgres    false            �            1259    32945    Category_CategoryId_seq    SEQUENCE     �   ALTER TABLE public."Category" ALTER COLUMN "CategoryId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Category_CategoryId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    32952    Role    TABLE     m   CREATE TABLE public."Role" (
    "RoleId" integer NOT NULL,
    "RoleName" character varying(50) NOT NULL
);
    DROP TABLE public."Role";
       public         heap    postgres    false            �            1259    32951    Role_RoleId_seq    SEQUENCE     �   ALTER TABLE public."Role" ALTER COLUMN "RoleId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Role_RoleId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    32958    User    TABLE     �   CREATE TABLE public."User" (
    "UserId" integer NOT NULL,
    "UserName" character varying(50) NOT NULL,
    "Email" character varying(100) NOT NULL,
    "RoleId" integer NOT NULL,
    "Password" bytea,
    "PasswordSalt" bytea
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    32957    User_UserId_seq    SEQUENCE     �   ALTER TABLE public."User" ALTER COLUMN "UserId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User_UserId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219                      0    32971    Auction 
   TABLE DATA           �   COPY public."Auction" ("AuctionId", "Title", "Description", "StartingPrice", "CategoryId", "StartsAt", "EndsIn", "Image") FROM stdin;
    public          postgres    false    221   &                 0    32984    Bid 
   TABLE DATA           H   COPY public."Bid" ("BidId", "Value", "AuctionId", "UserId") FROM stdin;
    public          postgres    false    223   9&                 0    32946    Category 
   TABLE DATA           B   COPY public."Category" ("CategoryId", "CategoryName") FROM stdin;
    public          postgres    false    215   V&                 0    32952    Role 
   TABLE DATA           6   COPY public."Role" ("RoleId", "RoleName") FROM stdin;
    public          postgres    false    217   �&                 0    32958    User 
   TABLE DATA           e   COPY public."User" ("UserId", "UserName", "Email", "RoleId", "Password", "PasswordSalt") FROM stdin;
    public          postgres    false    219   �&       %           0    0    Auction_AuctionId_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Auction_AuctionId_seq"', 1, false);
          public          postgres    false    220            &           0    0    Bid_BidId_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Bid_BidId_seq"', 1, false);
          public          postgres    false    222            '           0    0    Category_CategoryId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Category_CategoryId_seq"', 4, true);
          public          postgres    false    214            (           0    0    Role_RoleId_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Role_RoleId_seq"', 2, true);
          public          postgres    false    216            )           0    0    User_UserId_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."User_UserId_seq"', 3, true);
          public          postgres    false    218            �           2606    32977    Auction Auction_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Auction"
    ADD CONSTRAINT "Auction_pkey" PRIMARY KEY ("AuctionId");
 B   ALTER TABLE ONLY public."Auction" DROP CONSTRAINT "Auction_pkey";
       public            postgres    false    221            �           2606    32988    Bid Bid_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public."Bid"
    ADD CONSTRAINT "Bid_pkey" PRIMARY KEY ("BidId");
 :   ALTER TABLE ONLY public."Bid" DROP CONSTRAINT "Bid_pkey";
       public            postgres    false    223            z           2606    32950    Category Category_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("CategoryId");
 D   ALTER TABLE ONLY public."Category" DROP CONSTRAINT "Category_pkey";
       public            postgres    false    215            |           2606    32956    Role Role_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("RoleId");
 <   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_pkey";
       public            postgres    false    217            ~           2606    32964    User User_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserId");
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    219            �           2606    32989    Bid Bid_AuctionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bid"
    ADD CONSTRAINT "Bid_AuctionId_fkey" FOREIGN KEY ("AuctionId") REFERENCES public."Auction"("AuctionId") ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public."Bid" DROP CONSTRAINT "Bid_AuctionId_fkey";
       public          postgres    false    3200    221    223            �           2606    32994    Bid Bid_UserId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bid"
    ADD CONSTRAINT "Bid_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."User"("UserId") ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public."Bid" DROP CONSTRAINT "Bid_UserId_fkey";
       public          postgres    false    3198    223    219            �           2606    32978    Auction category_auction_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."Auction"
    ADD CONSTRAINT category_auction_fk FOREIGN KEY ("CategoryId") REFERENCES public."Category"("CategoryId") ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public."Auction" DROP CONSTRAINT category_auction_fk;
       public          postgres    false    221    3194    215            �           2606    32965    User role_user_id    FK CONSTRAINT     z   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT role_user_id FOREIGN KEY ("RoleId") REFERENCES public."Role"("RoleId");
 =   ALTER TABLE ONLY public."User" DROP CONSTRAINT role_user_id;
       public          postgres    false    217    3196    219                  x������ � �            x������ � �         2   x�3��K�.J-���K�2�˯��I�2��K��,�2��͂J��qqq `��            x�3�LL����2�,-N-����� : �           x�%��mDAD��h���e.͖������B�J������������U�k��ip_!�\ �����쮳���Ũ$9���vlP2>�sU�ݗ���#Hr�Sq�r�'*;7]�cX��/e{�yCy�v����y���
�x��E�6��� �ۆژ0B�q�2��xv���Lp7£�F��bi���q���C�]���Y&S���8Mt��TSo�n�.�k���7E� N��<>�{�����z��6�r     