import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Input,
  Button,
  Center,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/api";
import { useSearchParams } from "react-router-dom";
import { jobs } from "../fake-api/jobs";

const EmployeeTable = ({ firstName, lastName, gender, jobArea }) => {
  return (
    <Tbody>
      <Tr>
        <Td>
          {firstName} {lastName}
        </Td>
        <Td>{gender}</Td>
        <Td>{jobArea}</Td>
      </Tr>
    </Tbody>
  );
};

const EmployeePage = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("")
  const [searchValue, setSearchValue] = useState()

  const [genderInput, setGenderInput] = useState("")
  const [genderValue, setGenderValue] = useState("")
  const [occupationInput, setOcuppationInput] = useState("")
  const [occupationValue, setOccupationValue] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()

  const inputHandler = (event) => {
      const { value } = event.target

      setSearchInput(value)
  }

  const occupationHandler = (event) => {
      const { value } = event.target

      setOcuppationInput(value)
  }

  const genderHandler = (event) => {
    const { value } = event.target;

    setGenderInput(value);
  };

  const pageLimit = 10;

  const pageHandler = (direction = "next") => {
    let newPage = currentPage;

    if (direction === "prev" && currentPage === 1) {
      return;
    }
    
    if (direction === "next") {
      newPage += 1;
    } else if (direction === "prev") {
      newPage -= 1;
    }

    setCurrentPage(newPage);

    let newSearchParams = { page : newPage }

    if(searchValue){
      newSearchParams.search = searchValue
    }

    if(genderValue){
      newSearchParams.gender = genderValue
    }

    if(occupationValue){
      newSearchParams.occupation = occupationValue
    }

    setSearchParams(newSearchParams)
  };

  const searchButtonHandler = () => {
    setSearchValue(searchInput);
    setGenderValue(genderInput);
    setOccupationValue(occupationInput);
    setCurrentPage(1);

    let newSearchParams = { page: 1 }

    if(genderInput){
      newSearchParams.gender = genderInput
    }

    if(searchInput){
      newSearchParams.search = searchInput
    }

    if(occupationInput){
      newSearchParams.occupation = occupationInput
    }

      setSearchParams(newSearchParams)
    
  };

  const fetchEmployee = (
    queryParams = {
      params: {
        _limit: pageLimit,
      },
    }
  ) => {
    axiosInstance
      .get("/users", queryParams)
      .then((res) => {
        setEmployeeList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderEmployee = () => {
    return employeeList.map((val) => {
      return (
        <EmployeeTable
          firstName={val.first_name}
          lastName={val.last_name}
          gender={val.gender}
          jobArea={val.job_area}
        />
      );
    });
  };

  const renderJobs = () => {
      return jobs.map((val) => {
          return(
              <option value={val}>{val}</option>
          )
      })
  }

  useEffect(() => {
    let first_name = searchParams.get("search")
    let gender = searchParams.get("gender")
    let occupation = searchParams.get("occupation")
    

    fetchEmployee({ 
        params: {
            _limit: pageLimit,
            _page: currentPage,
            first_name: first_name || undefined,
            gender : gender || undefined,
            job_area: occupation || undefined
        }
      });
  }, [currentPage, searchValue, genderValue, occupationValue]);

  return (
    <Box width="80%" margin="3">
      <Box display="flex">
        <Input placeholder="input name" onChange={inputHandler} />
        <Select marginLeft="3" onChange={genderHandler} placeholder="select gender">
          <option>Female</option>
          <option>Male</option>
        </Select>
        <Select marginLeft="3" onChange={occupationHandler} placeholder="select jobs">
            {renderJobs()}
        </Select>
        <Button marginLeft="3" onClick={searchButtonHandler}>
          Search
        </Button>
      </Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Gender</Th>
            <Th>Job Area</Th>
          </Tr>
        </Thead>
        {renderEmployee()}
      </Table>
      <Center>
        <Box display="flex">
          <Button onClick={() => pageHandler("prev")} margin="8">
            Prev
          </Button>
          <Button onClick={() => pageHandler("next")} margin="8">
            Next
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default EmployeePage;
