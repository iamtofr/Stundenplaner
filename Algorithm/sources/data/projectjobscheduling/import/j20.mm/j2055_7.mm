************************************************************************
file with basedata            : md375_.bas
initial value random generator: 1884986721
************************************************************************
projects                      :  1
jobs (incl. supersource/sink ):  22
horizon                       :  138
RESOURCES
  - renewable                 :  2   R
  - nonrenewable              :  2   N
  - doubly constrained        :  0   D
************************************************************************
PROJECT INFORMATION:
pronr.  #jobs rel.date duedate tardcost  MPM-Time
    1     20      0       24       13       24
************************************************************************
PRECEDENCE RELATIONS:
jobnr.    #modes  #successors   successors
   1        1          3           2   3   4
   2        3          3           5   8  12
   3        3          3           6   7  17
   4        3          3           6   9  12
   5        3          2          10  18
   6        3          3          16  20  21
   7        3          3           8  10  13
   8        3          3          11  19  20
   9        3          2          10  16
  10        3          1          15
  11        3          1          21
  12        3          1          15
  13        3          3          14  15  21
  14        3          1          16
  15        3          1          19
  16        3          1          18
  17        3          2          18  20
  18        3          1          19
  19        3          1          22
  20        3          1          22
  21        3          1          22
  22        1          0        
************************************************************************
REQUESTS/DURATIONS:
jobnr. mode duration  R 1  R 2  N 1  N 2
------------------------------------------------------------------------
  1      1     0       0    0    0    0
  2      1     1       6    4    6    5
         2     7       5    3    1    5
         3     7       5    2    3    4
  3      1     1       9    3    4    6
         2     1       8    3    4    7
         3     3       7    3    4    6
  4      1     6       5    3    4    7
         2     8       4    2    2    7
         3     8       3    2    3    7
  5      1     1       8    8    8    9
         2     2       5    6    5    8
         3     2       5    7    5    6
  6      1     3       9    5    7    7
         2     4       6    3    7    6
         3     7       5    2    6    4
  7      1     5       8    9    7    9
         2     6       7    9    4    9
         3     7       6    9    2    7
  8      1     1      10    7    2   10
         2     6       8    4    2    6
         3    10       6    2    2    2
  9      1     7       9    8    3    3
         2     7       6    8    4    6
         3     7       8    7    4    6
 10      1     3      10    5    5    3
         2    10       9    5    4    2
         3    10      10    4    5    3
 11      1     2      10    6    6   10
         2     2       6    9    7   10
         3     9       2    6    4    7
 12      1     1       8    6    8    6
         2     4       3    5    5    5
         3     6       1    2    4    4
 13      1     1       7    7    2    5
         2     3       6    4    2    5
         3     5       5    1    1    5
 14      1     2       4    6    4    3
         2     6       4    4    4    2
         3     8       4    3    3    2
 15      1     1       8    8    5    7
         2     2       6    4    4    6
         3     2       5    4    5    6
 16      1     6      10    5    8    4
         2     7       7    5    3    3
         3     7       5    4    3    4
 17      1     1       9    6    5    7
         2     5       7    6    3    3
         3     9       7    5    2    3
 18      1     2       7    8    9    6
         2     6       5    7    7    3
         3    10       5    4    5    2
 19      1     3       7    6    2    8
         2     7       4    3    2    4
         3     7       6    1    1    3
 20      1     1       1    5   10    4
         2     3       1    4    7    3
         3     4       1    3    6    3
 21      1     1       8    9    4    4
         2     8       7    9    4    4
         3    10       7    9    3    1
 22      1     0       0    0    0    0
************************************************************************
RESOURCEAVAILABILITIES:
  R 1  R 2  N 1  N 2
   35   27  100  115
************************************************************************
