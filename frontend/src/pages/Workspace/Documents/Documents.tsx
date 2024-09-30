import React, { Fragment, useState } from 'react';
import Text from '../../../components/common/Text';
import { Box, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Icon, IconButton, InputAdornment, Stack, TextField, useTheme } from '@mui/material';
import { Add, Close, Delete, Edit, FileCopy, Search } from '@mui/icons-material';
import UniversalButton from '../../../components/common/UniversalButton';
import AddTags from '../../../components/common/AddTags';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@mui/material/colors';
import { SUPPORTED_FILE_EXTENSIONS, SUPPORTED_FILE_TYPE } from '../../../utils/constants';
import { transcribeAudio } from '../../../api/audio';
import { blobToFile, transformFileName } from '../../../utils/functions';
import { uploadFile } from '../../../api/files';
import { processDocToVectorDB } from '../../../api/rag';
import { AppDispatch } from '../../../redux/store';
import { createDocument, deleteDocument, updateDocument } from '../../../redux/slices/documents/thunk';
import TextFieldContainer from '../../../components/common/TextFieldContainer';

const Documents = () => {
  const theme = useTheme();
  const [tags, setTags] = useState<string[]>([])
  const [addDocModal, setAddDocModal] = useState<boolean>(false)
  const [editDocModal, setEditDocModal] = useState<boolean>(false)
  const [docs, setDocs] = useState<File[] | null>([])
const [nameTag,setNameTag] = useState<any>('');
const [title,setTitle] = useState<any>('');
const [selectedDoc,setSelectedDoc] =useState<any>(null)

  const docRef = React.useRef<HTMLInputElement | null>(null);
  let token: string | null = localStorage.getItem('token') || null;
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const documents = useSelector((state: any) => state?.documents?.documents);


  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (docs?.length) {
      for (const doc of Array.from(docs)) {
        if (SUPPORTED_FILE_TYPE.includes(doc.type) || SUPPORTED_FILE_EXTENSIONS.includes(doc.name.split('.').pop() || '')) {
          uploadDoc(doc, tags)
        } else {
          // toast.error(`Unknown File Type '${file.type}', but accepting and treating as plain text`);
        }
      }
    }
    else {
      // toast.error('No documents selected');
    }
    setAddDocModal(false);
    setDocs(null);

  }

  const uploadDoc = async (file: File, tags: Object) => {
    let _file = file;
    if (['audio/mpeg', 'audio/wav'].includes(file['type'])) {
      const transcribeRes = await transcribeAudio(token, _file).catch((err) => {
        console.log(err);
        // toast.error(err);
        return null;
      })

      if (transcribeRes) {
        const blob = new Blob([transcribeRes.text], { type: 'text/plain' });
        _file = blobToFile(blob, `${file.name}.txt`);
      }
    }

    // Upload the file to the server

    const uploadedFile = await uploadFile(token, _file).catch((err) => {
      // toast.error(err);
      console.log(err);
      return null;
    })

    // preocess doc to vecotorDB
    const response = await processDocToVectorDB(token, uploadedFile?.id).catch((err) => {
      // toast.error(error);
      return null;
    });
    if (response) {
      let data = {
        collection_name: response.collection_name,
        filename: response.filename,
        name: transformFileName(response.filename),
        title: response.filename,
        content: JSON.stringify({
          tags: (tags as string[])?.length > 0
            ? {
              tags: tags
            }
            : null
        })

      }
      dispatch(createDocument(data));
    }
  }

  const handleEditDocument = (doc: any) => {
    setEditDocModal(true);
    setSelectedDoc(doc)
    setNameTag(doc.name);
    setTitle(doc.title);
    if(doc?.content?.tags) {

      setTags(doc.tags);
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    let data = {
      params: { name: selectedDoc?.name },
      payload: {
        title: title,
        name: nameTag
      }
    };

    try {
      await dispatch(updateDocument(data)).unwrap();
      setEditDocModal(false);
    } catch (error) {
      console.error('Failed to update document:', error);
    }
  };

  return (
    <Fragment>
      {/* Title */}


      {/* <Text fontSize="1.12rem" fontWeight="600"> 
        Documents
      </Text> */}

      {/* Search */}

      <Box
        mb={0}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search documents"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <Icon fontSize="small">
                    <Search />
                  </Icon>
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton
                  onClick={() => setAddDocModal(true)}
                  sx={{
                    border: `1px solid ${theme.palette.grey[400]}`,
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: theme.palette.grey[300],
                      borderColor: theme.palette.grey[400],
                    },
                  }}
                >
                  <Icon fontSize="small">
                    <Add />
                  </Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              border: "none !important",
              padding: 0,
            },
            "& fieldset": {
              border: "0",
            },
          }}
        />
        <Divider sx={{
          mt: '.5rem'
        }} />

      </Box>


      {/* Documents */}
      <div>
        {documents?.map((doc: any) => (

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} px={1.5} py={1}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.grey[300],
                borderRadius: '.75rem'
              }
            }}>
            <Stack direction={'row'} gap={1.5} alignItems={'center'}>

              {/* <Checkbox checked sx={{
                width: '18px',
                height: '18px'
              }} /> */}
              <Box
                p={1.1}
                borderRadius={'.5rem'}
                width={'fit-content'}
                sx={{
                  backgroundColor: 'red',
                  color: common.white
                }}
              >
                <Icon>
                  <FileCopy sx={{
                    color: common.white
                  }} />
                </Icon>
              </Box>
              {/* fileName */}

              <Stack direction={'column'}>
                <Text fontSize={'1rem'} fontWeight={'600'}>#{doc.name} ({doc.filename})</Text>
                <Text fontSize={'.75rem'} color='grey.900'>{doc.title}</Text>
              </Stack>


            </Stack>
            {/* Edit and Delete Button */}
            <Stack direction={'row'} gap={1} >
              {/* Edit */}
              <IconButton
                onClick={() => handleEditDocument(doc)}
                sx={{
                  height: 'fit-content',
                  padding: '0.5rem',
                  borderRadius: '.75rem',

                  "&:hover": {
                    backgroundColor: theme.palette.grey[300]
                  }
                }}>
                <Icon fontSize='small'>
                  <Edit />
                </Icon>
              </IconButton>


              {/* eDelete */}
              <IconButton
                onClick={() => {
                  dispatch(deleteDocument(doc.name))
                }}
                sx={{
                  height: 'fit-content',
                  padding: '0.5rem',
                  borderRadius: '.75rem',

                  "&:hover": {
                    backgroundColor: theme.palette.grey[300]
                  }
                }}>
                <Icon fontSize='small'>
                  <Delete />
                </Icon>
              </IconButton>
            </Stack>

          </Stack>
        ))}
      </div>


      {/* Import & Export Button */}
      <Stack direction="row" gap={1} justifyContent={"end"}>
        <UniversalButton
          label={"Import Documents Mapping"}
          width={"fit-content"}
          height={"fit-content"}
          fontSize={"small"}
          textColor="common.black"
          sx={{
            fontWeight: "500",
            backgroundColor: "background.paper",
            border: "none ",
            borderRadius: ".75rem",
            padding: "0.375rem .75rem",
            lineHeight: "1",
            "&:hover": {
              backgroundColor: theme.palette.grey[400],
            },
          }}
        // startIcon  = {<Icon>
        //     <ImportExport />
        // </Icon> }
        />
        <UniversalButton
          label={"Export Documents Mapping"}
          width={"fit-content"}
          height={"fit-content"}
          fontSize={".75rem"}
          textColor="common.black"
          sx={{
            fontWeight: "500",
            backgroundColor: "background.paper",
            border: "none ",
            borderRadius: ".75rem",
            padding: "0.375rem .75rem",
            lineHeight: "1",
            "&:hover": {
              backgroundColor: theme.palette.grey[400],
            },
          }}
        // startIcon  = {<Icon>
        //     <ImportExport />
        // </Icon> }
        />
      </Stack>

      {/* Edit Doc Modal */}


      <Dialog
        component={'form'}
        onSubmit={handleEditSubmit}
        open={editDocModal}
        onClose={() => setEditDocModal(false)}
        sx={{
          '& .MuiDialog-paper': {
            width: '30rem !important',
            maxWidth: '100% !important',

          }
        }}
      >
        <DialogTitle display={'flex'} justifyContent={'space-between'}>
          <Text fontSize="1.12rem" fontWeight="500">Edit Doc</Text>
          <IconButton onClick={() => setEditDocModal(false)}>
            <Icon>
              <Close />
            </Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.75rem',
          }}>

          <TextFieldContainer label='Name Tag' >
            <Stack direction={'row'}
              // border={`1px solid ${theme.palette.grey[400]}`}
              borderRadius={'.75rem'}>
              <Box
                sx={{
                  borderTopLeftRadius: '.75rem',
                  borderBottomLeftRadius: '.75rem',
                  padding: '.15rem .75rem',
                  backgroundColor: 'grey.400',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}>
                #
              </Box>
              <TextField
              name='nameTag'
                value={nameTag}
                onChange={(e) => setNameTag(e.target.value)}
                variant='outlined'
                fullWidth

                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: '1rem',
                    paddingLeft: '0 !important',
                    borderTopRightRadius: '.75rem',
                    borderBottomRightRadius: '.75rem',
                    backgroundColor: 'common.white'
                  },

                  '& fieldset': {
                    border: 'none !important'
                  }

                }}
              />
            </Stack>

          </TextFieldContainer>

          <TextFieldContainer label='Title' >
            <Stack direction={'row'}
              // border={`1px solid ${theme.palette.grey[400]}`}
              borderRadius={'.75rem'}>

              <TextField
              name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant='outlined'
                fullWidth

                sx={{
                  '& .MuiInputBase-root': {
                    fontSize: '1rem',
                    paddingLeft: '0 !important',
                    borderRadius: '.75rem',
                    backgroundColor: 'common.white'
                  },

                  '& fieldset': {
                    border: 'none !important'
                  }

                }}
              />
            </Stack>

          </TextFieldContainer>

          <AddTags tags={tags} setTags={setTags} />
        </DialogContent>
        <DialogActions >
          <UniversalButton
            type="submit"
            label={"Save"}
            width={"fit-content"}
            // height={"fit-content"}
            fontSize={"medium"}
            textColor="common.white"
            sx={{
              m: '1rem',
              fontWeight: "500",
              backgroundColor: "success.main",
              border: "none ",
              borderRadius: ".5em",
              padding: "0.75rem 1rem",
              lineHeight: "1",
              "&:hover": {
                backgroundColor: 'success.dark',
              },
            }}

          />
        </DialogActions>
      </Dialog>

      {/* Add doc modal */}
      <Dialog
        component={'form'}
        onSubmit={handleSubmit}
        open={addDocModal}
        onClose={() => setAddDocModal(false)}
        sx={{
          '& .MuiDialog-paper': {
            width: '30rem !important',
            maxWidth: '100% !important',
          }
        }}
      >
        <DialogTitle display={'flex'} justifyContent={'space-between'}>
          <Text fontSize="1.12rem" fontWeight="500">Add Docs</Text>
          <IconButton onClick={() => setAddDocModal(false)}>
            <Icon>
              <Close />
            </Icon>
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>

          <UniversalButton
            type="button"
            onClick={() => {
              if (docRef.current) docRef.current?.click()
            }}
            label={docs?.length ? `${docs?.length} document(s) selected.` : "Click here to select documents."}
            width={"100%"}
            fontSize={".875rem"}
            textColor="common.black"
            sx={{
              fontWeight: "500",
              backgroundColor: "grey.400",
              border: "none ",
              borderRadius: ".75rem",
              padding: "1rem .75rem",
              lineHeight: "1",
              "&:hover": {
                backgroundColor: theme.palette.grey[500],
              },
            }}

          />

          <input
            type="file"
            ref={docRef}
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setDocs((prev: File[] | null) => [...Array.from(prev || []), ...Array.from(files)]);
              }
            }}
          />
          <AddTags tags={tags} setTags={setTags} />
        </DialogContent>
        <DialogActions >
          <UniversalButton
            type="submit"
            label={"Save"}
            width={"fit-content"}
            // height={"fit-content"}
            fontSize={"medium"}
            textColor="common.white"
            sx={{
              m: '1rem',
              fontWeight: "500",
              backgroundColor: "success.main",
              border: "none ",

              borderRadius: ".5em",
              padding: "0.75rem 1rem",
              lineHeight: "1",
              "&:hover": {
                backgroundColor: 'success.dark',
              },
            }}

          />
        </DialogActions>
      </Dialog>

    </Fragment>
  );
};

export default Documents;