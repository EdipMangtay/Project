import React from 'react';

import Link from 'next/link';

import { Box, Grid, Card, CardContent, Typography, Button, Chip }
from '@mui/material';


const DepartmentCards = () => {
  // Dinamik veri
  const departments = [
    { name: 'Hatay Teknik Ofis', users: 12, tags: ['AK', 'AS', 'OD', '+2'] },
    { name: 'Kahramanmaraş Teknik Ofis1', users: 12, tags: ['AK', 'AS', 'OD', '+2'] },
    { name: 'Kahramanmaraş Teknik Ofis2', users: 8, tags: ['AK', 'AS', 'OD', '+2'] },
    { name: 'Halkla İlişkiler Departmanı', users: 12, tags: ['AK', 'AS', 'OD', '+2'] },
    { name: 'IT Departmanı', users: 14, tags: ['AK', 'AS', 'OD', '+2'] },
  ];

  return (
    <Box sx={{ flexGrow: 1, px: 4, py: 2, padding: 1.6 }}>
      {/* Departmanlar Başlığı ve Kartlar */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Departmanlar
      </Typography>
      <Grid container spacing={7} mb={4}>
        {departments.map((dept, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                position: 'relative',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                p: 5,
              }}
            >
              {/* Sağ Üst Etiketler */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  gap: '3px',
                }}
              >
                {dept.tags.map((tag, idx) => (
                  <Chip
                    key={idx}
                    label={tag}
                    size="small"
                    sx={{
                      fontSize: '14px',
                      borderRadius: '50%',
                      height: '40px',
                      width: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f1f3f5',
                      color: '#495057',
                      fontWeight: 'bold',
                    }}
                  />
                ))}
              </Box>

              <CardContent>
                {/* Kullanıcı Sayısı */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6c757d',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {dept.users} Kullanıcı
                </Typography>

                {/* Departman İsmi */}
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    mt: 1,
                    color: '#212529',
                  }}
                >
                  {dept.name}
                </Typography>

                {/* Düzenleme Butonu */}
                <Button
                  variant="text"
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    color: '#007bff',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  Departmanı Düzenle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Yeni Departman Ekle Kartı */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                mb: 2,
                borderRadius: '50%',
                backgroundColor: '#e9ecef',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#adb5bd',
                fontSize: '24px',
              }}
            >
              B
            </Box>
            <Link href="/departments/add">
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  backgroundColor: '#007bff',
                  '&:hover': { backgroundColor: '#0056b3' },
                }}
              >
                + Departman Ekle
              </Button>
            </Link>
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                textAlign: 'center',
                color: '#6c757d',
                fontSize: '12px',
              }}
            >
              Eğer yeni bir departmanınız yok ise
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Cardların Altına Eklenen Başlık */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          mt: 20,
          mb: 1,
          color: '#212529',
        }}
      >
        Departman Listesi
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#6c757d',
          fontSize: '14px',
          mb: 3,
        }}
      >
        Şirketlere ait departmanların listesi
      </Typography>
    </Box>
  );
};

export default DepartmentCards;
