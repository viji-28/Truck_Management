import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Designation } from '../actions';
import './styles/permissions.css';

import {
  editById,
  // getDesignation,
  getPermission,
  updatePermission,
} from '../actions';
const Permissions = ({ socket }) => {
  let DesId;
  const navigate = useNavigate();

  const [Permission, setPermission] = useState([]);

  const [Clicked, setClicked] = useState('');

  const [User, setUser] = useState('');

  const dispatch = useDispatch();
  const {
    permissions,
    designa,
    designation,
    designationSelected,
    PermissionsSocket,
  } = useSelector((state) => state.functionReducer);

  console.log('permissions', permissions);
  console.log('designa', designa);
  useEffect(() => {
    dispatch(getPermission(DesId));
    dispatch(Designation());
  }, []);
  useEffect(() => {
    setPermission(designa ? designa : []);
  }, [designa]);

  // useEffect(() => {
  //   socket.emit('sendPermissions');
  // }, []);
  useEffect(() => {
    socket.on('GetPermissions', (data) => {});
  }, [socket]);
  const uniqueMenus = new Set(permissions?.map((item) => item.menu));
  const menus = Array.from(uniqueMenus);
  const handleChange = (e) => {
    if (e.target.checked) {
      setPermission((prevState) => [...prevState, e.target.value]);
    } else {
      setPermission(Permission?.filter((item) => item !== e.target.value));
    }
  };

  const onsubmit = (e) => {
    dispatch(updatePermission(User, Permission));
  };

  const handleDesignationChange = (e) => {
    DesId = e.target.value;
    setUser(e.target.value);
    dispatch(getPermission(e.target.value));
    dispatch(editById(e.target.value));
  };

  const handleSelectAllChange = (e, menu) => {
    const checked = e.target.checked;
    if (checked) {
      const menuPermissions = permissions
        ?.filter((item) => item.menu === menu)
        .map((item) => item.id);
      // setPermission((prevState) => [...prevState, ...menuPermissions]);
      setPermission((prevState) => {
        const newPermissions = [...prevState];
        menuPermissions?.forEach((permission) => {
          if (!newPermissions.includes(permission)) {
            newPermissions.push(permission);
          }
        });

        return newPermissions;
      });
    } else {
      setPermission((prevState) =>
        prevState.filter(
          (item) =>
            permissions?.find((permission) => permission?.id === item)?.menu !==
            menu
        )
      );
    }
  };

  const checkIsAllSelected = (item) => {
    const permissionsOnItem = permissions?.filter(
      (permissionItem) => permissionItem?.menu == item
    );
    let count = 0;
    permissionsOnItem?.map((innerPermission) =>
      Permission && Permission?.includes(innerPermission?.id) ? count++ : null
    );
    console.log(
      'ehgyrdjhfj',
      permissionsOnItem?.map((innerPermission) =>
        Permission && Permission?.includes(innerPermission?.id) ? count++ : null
      )
    );
    if (permissionsOnItem.length == count) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'white',
        margin: '10% 0% 0% 0%',
      }}
    >
      <div style={{ width: '100%', margin: '0% 0% 0% 12.8%' }}>
        <select
          className="form-select user_drop"
          aria-label="Default select example"
          onChange={handleDesignationChange}
        >
          <option value="Select One Option">Select One Option</option>
          {designation?.map((e, index) => {
            return (
              <>
                <option value={e.id} key={index}>
                  {e.designation}
                </option>
              </>
            );
          })}
        </select>
      </div>

      {User
        ? menus.map((datas, index) => {
            return (
              <div
                className="container"
                style={{ margin: '0 auto', padding: '1%', width: '100%' }}
                key={index}
              >
                <Accordion
                  style={{
                    // background: '#ff8008',
                    background:
                      '-webkit-linear-gradient(to right, #ff8008, #ffc837)',
                    background: 'linear-gradient(to right, #ff8008, #ffc837)',
                    margin: '0% 0% 0% 0%',
                    width: '100%',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <Typography>{datas}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <div
                        style={{
                          display: 'inline-block',
                        }}
                      >
                        All Permission
                      </div>
                      <div
                        style={{
                          display: 'inline-block',
                          float: 'right',
                        }}
                      >
                        <label className="toggleButton">
                          <input
                            type="checkbox"
                            id={datas}
                            checked={checkIsAllSelected(datas)}
                            onChange={(e) => handleSelectAllChange(e, datas)}
                          />
                          <div>
                            <svg viewBox="0maxHeight:'140vh' 0 44 44">
                              <path
                                d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
                                transform="translate(-2.000000, -2.000000)"
                              ></path>
                            </svg>
                          </div>
                        </label>

                        <a
                          className="dribbble"
                          href="https://dribbble.com/shots/5283141-Toggle-check-button"
                          target="_blank"
                        ></a>
                      </div>
                      <br></br>
                      <br></br>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {permissions.map((data, index) => {
                        return data.menu === datas ? (
                          <div key={index}>
                            <Typography>{data.subMenu}</Typography>
                            <input
                              key={index}
                              id={data.id}
                              onChange={(e) => handleChange(e)}
                              checked={
                                Permission
                                  ? Permission?.includes(data.id)
                                  : false
                              }
                              type="checkbox"
                              // checked={Clicked ? true : false}
                              value={data.id}
                            ></input>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })
        : null}

      <div className="pakru">
        <button className="glowing-btn" onClick={(e) => onsubmit(e)}>
          <span className="glowing-txt">
            U<span className="faulty-letter">P</span>D
            <span className="faulty-letter">A</span>T
            <span className="faulty-letter">E</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Permissions;
