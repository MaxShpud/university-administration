import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context/UserContext.jsx"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { modals } from '@mantine/modals';
import {Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    CloseButton, 
    Box, 
    Notification,
     rem,
     LoadingOverlay,
    Select,
    AppShell, Burger, Group, Skeleton, Table, Modal, FocusTrap, FileButton, Drawer, Flex, ActionIcon 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './Home.css'
import { IconLogout  } from '@tabler/icons-react';
import exit_btn from "../../assets/exit_btn.svg" 
import { IconX, IconCheck } from '@tabler/icons-react';

const text = "Отсутствие актов о нарушении санитарного состояния, пожарной безопасности, охраны труда и других актов противоправных действий (в том числе административные и уголовные преступления, нарушения правил внутреннего трудового распорядка, пропускного режима с использованием СКУД и иных) в отношении работников, обучающихся и проживающих в общежитиях (по факультету)"
const elements = [
    { position: text, mass: "Март", symbol: '0', name: '5%', ur: "устанавливается и выплачивается в месяце, следующем за отчетным", mur: "5"},
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

const MONTHS = [
    { label: "Январь", value: "Январь" },
    { label: "Февраль", value: "Февраль" },
    { label: "Март", value: "Март" },
    { label: "Апрель", value: "Апрель" },
    { label: "Май", value: "Май" },
    { label: "Июнь", value: "Июнь" },
    { label: "Июль", value: "Июль" },
    { label: "Август", value: "Август" },
    { label: "Сентябрь", value: "Сентябрь" },
    { label: "Октябрь", value: "Октябрь" },
    { label: "Ноябрь", value: "Ноябрь" },
    { label: "Декабрь", value: "Декабрь" },
  ];

const Home = ({theme, setTheme}) => {
    const [userData, setUserData] = useContext(UserContext)
    const navigate = useNavigate()
    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
    //const [opened, { toggle }] = useDisclosure();
    const [statistics, setStatistics] = useState([]);
    const [createdStatistic, setCreatedStatistic] = useState({
      indicators: "",
      control_period: "",
      value_of_indicators: "",
      max_amount_of_additional_bonus: "",
      note: "",
      proposed_amount_of_additional_bonus: "",
    })
    const [month, setMonth] = useState("Январь");
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [successAdded, setSuccessAdded] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    
    if (!userData.token) {
      navigate('/', {replace: true})
    }

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await fetch(`/api/statistics/${month}`, {
                    headers: {
                        Authorization: `Bearer ${userData.token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setStatistics(data.statistics);
                } else {
                    console.error('Failed to get statistics data');
                    navigate('/', { replace: true })
                } 
            } catch (error) {
              setErrorMessage(error.message);
              setTimeout(() => setErrorMessage(''), 5000);
            }
        };

        fetchMarkers();
    }, [month])

    const rows = statistics.map((element, index) => (
        <Table.Tr key={element.alias}>
            <Table.Td style={{ border: '1px solid #000', padding: '8px' }}>{index + 1}</Table.Td>
            <Table.Td style={{ border: '1px solid #000', padding: '8px' }}>{element.indicators}</Table.Td>
            <Table.Td style={{ border: '1px solid #000', padding: '8px' }}>{element.control_period}</Table.Td>
            <Table.Td style={{ border: '1px solid #000', padding: '8px' }}>{element.value_of_indicators}</Table.Td>
            <Table.Td style={{ border: '1px solid #000', padding: '8px' }}>{element.max_amount_of_additional_bonus}</Table.Td>
            <Table.Td style={{ border: '1px solid #000', padding: '8px' }}>{element.note}</Table.Td>
            <Table.Td style={{ border: '1px solid #000', padding: '8px' }}>{element.proposed_amount_of_additional_bonus}</Table.Td>
        </Table.Tr>
      ));
    
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreatedStatistic((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async () => {
        try {
          const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${userData.token}`},
            body: JSON.stringify({
              indicators: createdStatistic.indicators,
              control_period: createdStatistic.control_period,
              value_of_indicators: createdStatistic.value_of_indicators,
              max_amount_of_additional_bonus: createdStatistic.max_amount_of_additional_bonus,
              note: createdStatistic.note,
              proposed_amount_of_additional_bonus: createdStatistic.proposed_amount_of_additional_bonus,
            })
        };
        const response = await fetch("/api/statistic", requestOptions);
        const data = await response.json();
      
          if (response.ok) {  
            setSuccessAdded("Запись успешно добавлена!")
                setTimeout(() => {
                  setSuccessAdded('');
                }, 4000);
          } else {
              console.error('Failed')
          }
      } catch (error) {
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(''), 5000);
      }
      finally{
        setCreatedStatistic({
          indicators: "",
          control_period: "",
          value_of_indicators: "",
          max_amount_of_additional_bonus: "",
          note: "",
          proposed_amount_of_additional_bonus: "",
      });  
      }
        console.log("Form data:", createdStatistic);
        close();
      };


    const handleLogout = () => {
      setUserData({ token: null, userRole: null });
      navigate('/', {replace: true})
    }
    return (
      <>
        
          <AppShell
          header={{ height: 80 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
          padding="md"
        >  
        
        <AppShell.Header style={{ borderBottom: '2px solid black' }}>
          <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Text fw={300}>Информация с оценкой показателей эффективности деятельности</Text>
            <Text fw={300}>заведующего кафедрой (как руководителя) Полозкова Ю.В. ФИТР, кафедра «ПОИСиТ»</Text>
            <ActionIcon variant="filled" aria-label="Logout" onClick={handleLogout} >
              <IconLogout style={{ width: '70%', height: '70%', justifyContent: "flex-end" }} stroke={1.5} />
            </ActionIcon>
          </Group>
          {successAdded && <Notification icon={checkIcon} 
        color="green" withBorder title="Успех!"
          style={{ position: 'fixed', top: '20px', right: '20px' }} 
          >
            {successAdded}
        </Notification>} 
        </AppShell.Header>
        
        <AppShell.Navbar p="md" style={{ borderBottom: '2px solid black' }}>
          
        <Modal opened={opened} onClose={() => {
              close();
              setCreatedStatistic({
                  indicators: "",
                  control_period: "",
                  value_of_indicators: "",
                  max_amount_of_additional_bonus: "",
                  note: "",
                  proposed_amount_of_additional_bonus: "",
              });
          }} title="Создание записи" 
          >
          <FocusTrap.InitialFocus />
          <TextInput
          label="Показатель"
          placeholder="Введите показатель"
          name="indicators"
          value={createdStatistic.indicators}
          onChange={handleInputChange}
          mt="sm"
        />
        <Select
            label="Период контроля (отчетный)"
            placeholder="Выберите период контроля"
            data={MONTHS}
            value={createdStatistic.control_period}
            onChange={(value) => setCreatedStatistic((prevData) => ({
              ...prevData,
              control_period: value,
          }))}
        />
        {userData.userRole === "ADMIN" && (
          <>
            <TextInput
              label="Значения показателей"
              placeholder="Введите значения показателей"
              name="value_of_indicators"
              value={createdStatistic.value_of_indicators}
              onChange={handleInputChange}
              mt="sm"
            />
            <TextInput
              label="Макс. размер доп. премии (в % от оклада)"
              placeholder="Введите макс. размер доп. премии "
              name="max_amount_of_additional_bonus"
              value={createdStatistic.max_amount_of_additional_bonus}
              onChange={handleInputChange}
              mt="sm"
            />
            <TextInput
              label="Примечание"
              placeholder="Введите примечание"
              name="note"
              value={createdStatistic.note}
              onChange={handleInputChange}
              mt="sm"
            />
            <TextInput
              label="Предлагаемый размер доп. премии"
              placeholder="Введите предлагаемый размер доп. премии"
              name="proposed_amount_of_additional_bonus"
              value={createdStatistic.proposed_amount_of_additional_bonus}
              onChange={handleInputChange}
              mt="sm"
            />
          </>
        )}
        
        <Box mt="md">
          
            <Button onClick={handleSubmit} variant="filled" color="teal">Создать</Button>
          
        </Box>
          </Modal>
          <Button onClick={open} variant="filled" color="teal">Создать запись</Button>
        </AppShell.Navbar>
           
            <AppShell.Main style={{ borderBottom: '2px solid black' }}>
                    <Box mb={20}>
                        <Select
                            label="Месяц"
                            placeholder="Выберите месяц"
                            data={MONTHS}
                            value={month}
                            onChange={(value) => setMonth(value)}
                        />
                    </Box>
            <Table.ScrollContainer >
                <Table>
                      <Table.Thead>
                        <Table.Tr style={{ border: '1px solid #000', padding: '8px' }}>
                            <Table.Th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>№</Table.Th>
                            <Table.Th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Показатели</Table.Th>
                            <Table.Th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Период контроля (отчетный)</Table.Th>
                            <Table.Th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Значения показателей</Table.Th>
                            <Table.Th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Макс. размер доп. премии (в % от оклада)</Table.Th>
                            <Table.Th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Примечание</Table.Th>
                            <Table.Th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Предлагаемый размер доп. премии</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>               
            </Table.ScrollContainer>      
            </AppShell.Main>  
             
        </AppShell>
        
        </>
    );
}

export default Home