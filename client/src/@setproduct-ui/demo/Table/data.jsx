import React from "react";

import Chips from "../../core/Chips";

export const Head = [
  { id: "no", label: "No." },
  { id: "customer", label: "Customer" },
  { id: "company", label: "Company" },
  { id: "date", label: "Order Date" },
  { id: "status", label: "Status" },
  { id: "address", label: "Address" }
];

export const Data = [
  {
    id: 1,
    no: 2134,
    customer: "Daniel Webster",
    company: "Y-corporation",
    date: "07/14/1984",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Ulrike-Günther-Platz 145, 18410 Guben"
  },
  {
    id: 2,
    no: 1259,
    customer: "Derek Barnhouse",
    company: "Goodsilron",
    date: "07/03/1990",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Brunhilde-Hecht-Allee 5/9, 90409 Sangerhausen"
  },
  {
    id: 3,
    no: 1042,
    customer: "Terresa Juarez",
    company: "Donquadtech",
    date: "08/13/1991",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Moritzweg 0, 77139 Bad Langensalza"
  },
  {
    id: 4,
    no: 1496,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 5,
    no: 1122,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  },
  {
    id: 6,
    no: 1238,
    customer: "Daniel Webster",
    company: "Y-corporation",
    date: "07/14/1984",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Ulrike-Günther-Platz 145, 18410 Guben"
  },
  {
    id: 7,
    no: 1258,
    customer: "Derek Barnhouse",
    company: "Goodsilron",
    date: "07/03/1990",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="default"
        tag="STOPPED"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Brunhilde-Hecht-Allee 5/9, 90409 Sangerhausen"
  },
  {
    id: 8,
    no: 1041,
    customer: "Terresa Juarez",
    company: "Donquadtech",
    date: "08/13/1991",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="warning"
        tag="WARN"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Moritzweg 0, 77139 Bad Langensalza"
  },
  {
    id: 9,
    no: 1898,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 10,
    no: 1123,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  },
  {
    id: 11,
    no: 2662,
    customer: "Daniel Webster",
    company: "Y-corporation",
    date: "07/14/1984",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Ulrike-Günther-Platz 145, 18410 Guben"
  },
  {
    id: 12,
    no: 1259,
    customer: "Derek Barnhouse",
    company: "Goodsilron",
    date: "07/03/1990",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Brunhilde-Hecht-Allee 5/9, 90409 Sangerhausen"
  },
  {
    id: 13,
    no: 1042,
    customer: "Terresa Juarez",
    company: "Donquadtech",
    date: "08/13/1991",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Moritzweg 0, 77139 Bad Langensalza"
  },
  {
    id: 14,
    no: 1496,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 15,
    no: 1122,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  },
  {
    id: 16,
    no: 1238,
    customer: "Daniel Webster",
    company: "Y-corporation",
    date: "07/14/1984",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Ulrike-Günther-Platz 145, 18410 Guben"
  },
  {
    id: 17,
    no: 1258,
    customer: "Derek Barnhouse",
    company: "Goodsilron",
    date: "07/03/1990",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="default"
        tag="STOPPED"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Brunhilde-Hecht-Allee 5/9, 90409 Sangerhausen"
  },
  {
    id: 18,
    no: 1041,
    customer: "Terresa Juarez",
    company: "Donquadtech",
    date: "08/13/1991",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="warning"
        tag="WARN"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Moritzweg 0, 77139 Bad Langensalza"
  },
  {
    id: 19,
    no: 1313,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 20,
    no: 1123,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  },
  {
    id: 21,
    no: 1313,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 22,
    no: 1123,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  }
];

export const Data2 = [
  {
    id: 1,
    no: 2039,
    customer: "Daniel Webster",
    company: "Y-corporation",
    date: "07/14/1984",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Ulrike-Günther-Platz 145, 18410 Guben"
  },
  {
    id: 2,
    no: 1259,
    customer: "Derek Barnhouse",
    company: "Goodsilron",
    date: "07/03/1990",
    status: (
      <Chips
        mdc_style={["dense", "outlined", "danger"]}
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Brunhilde-Hecht-Allee 5/9, 90409 Sangerhausen"
  },
  {
    id: 3,
    no: 1042,
    customer: "Terresa Juarez",
    company: "Donquadtech",
    date: "08/13/1991",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Moritzweg 0, 77139 Bad Langensalza"
  },
  {
    id: 4,
    no: 1496,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 5,
    no: 1122,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  },
  {
    id: 6,
    no: 1238,
    customer: "Daniel Webster",
    company: "Y-corporation",
    date: "07/14/1984",
    status: (
      <Chips
        type="dense"
        view="outlined"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Ulrike-Günther-Platz 145, 18410 Guben"
  },
  {
    id: 7,
    no: 1258,
    customer: "Derek Barnhouse",
    company: "Goodsilron",
    date: "07/03/1990",
    status: (
      <Chips
        type="dense"
        view="outlined"
        tag="STOPPED"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Brunhilde-Hecht-Allee 5/9, 90409 Sangerhausen"
  },
  {
    id: 8,
    no: 1041,
    customer: "Terresa Juarez",
    company: "Donquadtech",
    date: "08/13/1991",
    status: (
      <Chips
        type="dense"
        view="outlined"
        color="warning"
        tag="WARN"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Moritzweg 0, 77139 Bad Langensalza"
  },
  {
    id: 9,
    no: 1313,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 10,
    no: 1123,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="outlined"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  },
  {
    id: 11,
    no: 22389,
    customer: "Daniel Webster",
    company: "Y-corporation",
    date: "07/14/1984",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Ulrike-Günther-Platz 145, 18410 Guben"
  },
  {
    id: 12,
    no: 1259,
    customer: "Derek Barnhouse",
    company: "Goodsilron",
    date: "07/03/1990",
    status: (
      <Chips
        mdc_style={["dense", "outlined", "danger"]}
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Brunhilde-Hecht-Allee 5/9, 90409 Sangerhausen"
  },
  {
    id: 13,
    no: 1042,
    customer: "Terresa Juarez",
    company: "Donquadtech",
    date: "08/13/1991",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Moritzweg 0, 77139 Bad Langensalza"
  },
  {
    id: 14,
    no: 1496,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 15,
    no: 1122,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  },
  {
    id: 16,
    no: 1238,
    customer: "Daniel Webster",
    company: "Y-corporation",
    date: "07/14/1984",
    status: (
      <Chips
        type="dense"
        view="outlined"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Ulrike-Günther-Platz 145, 18410 Guben"
  },
  {
    id: 17,
    no: 1258,
    customer: "Derek Barnhouse",
    company: "Goodsilron",
    date: "07/03/1990",
    status: (
      <Chips
        type="dense"
        view="outlined"
        tag="STOPPED"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Brunhilde-Hecht-Allee 5/9, 90409 Sangerhausen"
  },
  {
    id: 18,
    no: 1041,
    customer: "Terresa Juarez",
    company: "Donquadtech",
    date: "08/13/1991",
    status: (
      <Chips
        type="dense"
        view="outlined"
        color="warning"
        tag="WARN"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Moritzweg 0, 77139 Bad Langensalza"
  },
  {
    id: 19,
    no: 1099,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 20,
    no: 1123,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="outlined"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  },
  {
    id: 21,
    no: 1099,
    customer: "Florence Boyle",
    company: "Conecom",
    date: "09/15/1986",
    status: (
      <Chips
        type="dense"
        view="smooth"
        color="success"
        tag="OK"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Meyerring 3/0, 18049 Steinfurt"
  },
  {
    id: 22,
    no: 1123,
    customer: "Will Hernandez",
    company: "Openlane",
    date: "01/25/1996",
    status: (
      <Chips
        type="dense"
        view="outlined"
        color="danger"
        tag="LOSS"
        round={false}
        //style={{ height: "20px" }}
      />
    ),
    address: "Sigurd-Kühn-Allee 8/6, 76106 Weißenfels"
  }
];
