************************************************************************
file with basedata            : mm34_.bas
initial value random generator: 1280105950
************************************************************************
projects                      :  1
jobs (incl. supersource/sink ):  12
horizon                       :  92
RESOURCES
  - renewable                 :  2   R
  - nonrenewable              :  2   N
  - doubly constrained        :  0   D
************************************************************************
PROJECT INFORMATION:
pronr.  #jobs rel.date duedate tardcost  MPM-Time
    1     10      0       15        7       15
************************************************************************
PRECEDENCE RELATIONS:
jobnr.    #modes  #successors   successors
   1        1          3           2   3   4
   2        3          3           5   6   9
   3        3          2           7  11
   4        3          1           9
   5        3          2          10  11
   6        3          2           7  11
   7        3          1           8
   8        3          1          10
   9        3          1          12
  10        3          1          12
  11        3          1          12
  12        1          0        
************************************************************************
REQUESTS/DURATIONS:
jobnr. mode duration  R 1  R 2  N 1  N 2
------------------------------------------------------------------------
  1      1     0       0    0    0    0
  2      1     4       6    3    0    8
         2     6       4    3    0    6
         3    10       4    3    3    0
  3      1     4       4    2    9    0
         2     5       3    2    8    0
         3     9       1    1    0    7
  4      1     3       3    7    0    9
         2     9       3    6    0    9
         3    10       2    5    8    0
  5      1     4       5    7    3    0
         2    10       4    1    0    5
         3    10       5    1    2    0
  6      1     3       6    6    7    0
         2     5       6    4    5    0
         3    10       4    3    0    7
  7      1     1       2    3    0   10
         2     5       2    2    0    8
         3    10       2    1    0    7
  8      1     5       4    9    6    0
         2     7       4    8    0    3
         3     8       3    8    5    0
  9      1     8       7    8    9    0
         2     9       5    8    9    0
         3    10       4    8    7    0
 10      1     2       8    7    9    0
         2     4       3    5    0    5
         3     6       2    3    9    0
 11      1     1       9    9    0    6
         2     3       6    8    0    3
         3     9       5    7    6    0
 12      1     0       0    0    0    0
************************************************************************
RESOURCEAVAILABILITIES:
  R 1  R 2  N 1  N 2
    8   12   34   34
************************************************************************
